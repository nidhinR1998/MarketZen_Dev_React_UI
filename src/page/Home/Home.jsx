import { Button } from '@/components/ui/button';
import AssetTable from './AssetTable';
import StockChart from './StockChart';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Cross1Icon, DotIcon } from '@radix-ui/react-icons';
import { MessageCircle, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getCoinList, getTop50CoinList } from '@/State/Coin/Action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { getBusinessNews, getCryptoNews, getPoliticalNews, getSportsNews } from '@/State/News/Action';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { fetchBotResponse } from '@/State/AiChatBote/Action';

const Home = () => {
    const { chatHistory } = useSelector((state) => state.aiChatBot);
    const [category, setCategory] = useState("all");
    const [inputValue, setInputValue] = useState("");
    const [isBotRelease, setIsBotRelease] = useState(false); // Ensure this is initialized early
    const [currentPage, setCurrentPage] = useState(1);
    const [chatHistoryLocal, setChatHistory] = useState([]); // For managing local chat history

    const dispatch = useDispatch();
    const { coin, news } = useSelector((store) => store);
    const itemsPerPage = 10;

    const handleBotRelease = () => {
        setIsBotRelease(!isBotRelease);

        // Clear local chat history when chatbot is closed
        if (isBotRelease) {
            setChatHistory([]);
        }
    };

    const handleCategory = (value) => setCategory(value);

    const handleSendMessage = () => {
        if (inputValue.trim() !== "") {
            // Update local chat history with the user's message
            setChatHistory((prev) => [
                ...prev,
                { role: "user", text: inputValue },
            ]);

            // Dispatch action to fetch bot response
            dispatch(fetchBotResponse(inputValue));

            // Clear the input field
            setInputValue("");
        }
    };

    useEffect(() => {
        // Append only bot responses to the local chat history
        if (chatHistory.length > 0) {
            const latestMessage = chatHistory[chatHistory.length - 1];
            if (latestMessage.role === "bot") {
                setChatHistory((prev) => [...prev, latestMessage]);
            }
        }
    }, [chatHistory]);

    // Initialize chatbot message when released
    useEffect(() => {
        if (isBotRelease) {
            setChatHistory([
                { role: "bot", text: "Hi there! How can I help you today?" },
            ]);
        }
    }, [isBotRelease]);

    useEffect(() => {
        dispatch(getTop50CoinList());
    }, [category]);

    useEffect(() => {
        dispatch(getCoinList(currentPage));
    }, [currentPage]);

    //Modified Code(Fix for One type news is not loading due to repetedly calling this method)
    let lastExecutionTime = 0; // Variable to track the last execution time
    useEffect(() => {
        const fetchNews = async () => {
            const jwt = localStorage.getItem("jwt");
            if (!jwt) {
                console.error("JWT token not found in localStorage");
                return;
            }

            const now = Date.now(); // Current timestamp in milliseconds
            const timeSinceLastExecution = now - lastExecutionTime;

            if (timeSinceLastExecution < 3000) {
                console.log("Second call ignored. Details:", {
                    currentTime: new Date(now).toISOString(),
                    lastExecution: new Date(lastExecutionTime).toISOString(),
                });
                return; // Do not process the request
            }

            lastExecutionTime = now; // Update the last execution time

            try {
                dispatch(getCryptoNews(jwt));
                dispatch(getBusinessNews(jwt));
                dispatch(getSportsNews(jwt));
                dispatch(getPoliticalNews(jwt));
            } catch (error) {
                console.error("Failed to load news:", error);
            }
        };

        fetchNews();
    }, []);


    // Working Code 
    // useEffect(() => {
    //     const fetchNews = async () => {
    //         const jwt = localStorage.getItem("jwt");
    //         if (!jwt) {
    //             console.error("JWT token not found in localStorage");
    //             return;
    //         }
    //         try {
    //             dispatch(getCryptoNews(jwt));
    //             dispatch(getBusinessNews(jwt));
    //         } catch (error) {
    //             console.error("Failed to load news:", error);
    //         }
    //     };

    //     fetchNews();
    // }, []);


    return (
        <div className="relative p-4">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 lg:border-r">
                    <div className="p-3 flex items-center gap-4 flex-wrap">
                        <Button onClick={() => handleCategory("all")} variant={category === "all" ? "default" : "outline"} className="rounded-full">All</Button>
                        <Button onClick={() => handleCategory("top50")} variant={category === "top50" ? "default" : "outline"} className="rounded-full">Top 50</Button>
                        <Button onClick={() => handleCategory("topGainers")} variant={category === "topGainers" ? "default" : "outline"} className="rounded-full">Top Gainers</Button>
                        <Button onClick={() => handleCategory("topLosers")} variant={category === "topLosers" ? "default" : "outline"} className="rounded-full">Top Losers</Button>
                    </div>
                    <AssetTable coin={category === "all" ? coin.coinList : coin.top50} category={category} />

                    {/* Pagination */}
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">{currentPage}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" onClick={() => setCurrentPage(currentPage + 1)} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>

                {/* Chart and Coin Details */}
                <div className="w-full lg:w-1/2 p-5">
                    <StockChart coinId="bitcoin" className="w-full h-64 lg:h-auto" />
                    <div className="flex gap-5 items-center mt-4">
                        <Avatar>
                            <AvatarImage src={coin.coinDetails?.image.large} />
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <p>{coin.coinDetails?.symbol.toUpperCase()}</p>
                                <DotIcon className="text-gray-400" />
                                <p className="text-gray-400">{coin.coinDetails?.name}</p>
                            </div>
                            <div className="flex items-end gap-2">
                                <p className="text-xl font-bold">${coin.coinDetails?.market_data.current_price.usd}</p>
                                <p className="text-red-600">
                                    <span>-{coin.coinDetails?.market_data.market_cap_change_24h}</span>
                                    <span>(-{coin.coinDetails?.market_data.market_cap_change_percentage_24h}%)</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* News Section */}
            {/* <div className="relative p-4 bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen text-gray-100"> */}
            <div className="relative p-4 bg-gradient-to-r from-gray-399 to-gray-400 min-h-screen text-gray-100">
            <div className="flex flex-col gap-16">
                {/* Section Component */}
                {[
                    { title: "Business News", data: news.businessArticles },
                    { title: "Crypto News", data: news.cryptoArticles },
                    { title: "Sports News", data: news.sportsArticles },
                    { title: "Political News", data: news.politicalArticles },
                ].map((section, index) => (
                    <div key={index} className="w-full">
                        {/* News Type Name */}
                        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-6">
                            {section.title}
                        </h2>
                        {/* News Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {section.data?.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105"
                                >
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-6 flex flex-col gap-4">
                                        <h3 className="text-lg font-bold text-blue-400 hover:underline">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            Published on:{" "}
                                            {new Date(item.publishedAt).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-300 line-clamp-3">
                                            {item.description}
                                        </p>
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="self-start mt-auto text-purple-500 hover:text-purple-300"
                                        >
                                            Read more →
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

            {/* Chatbot Section */}
            <section className="fixed bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
                {isBotRelease && (
                    <div className="rounded-md w-96 md:w-[28rem] h-[28rem] md:h-[70vh] bg-slate-900 shadow-lg border border-gray-700">
                        {/* Chatbot Header */}
                        <div className="flex justify-between items-center border-b border-gray-700 px-6 py-3 bg-slate-800 text-white">
                            <p className="font-bold text-lg">Coin Bot</p>
                            <Button onClick={handleBotRelease} variant="ghost" size="icon">
                                <Cross1Icon className="text-white" />
                            </Button>
                        </div>

                        {/* Chat History */}
                        <div className="flex flex-col overflow-y-auto gap-4 px-4 py-2 h-[75%] scroll-container bg-slate-950">
                            {chatHistoryLocal.map((chat, index) => (
                                <div
                                    key={index}
                                    className={`flex ${chat.role === "user" ? "justify-start" : "justify-end"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[70%] px-4 py-2 rounded-lg ${chat.role === "user"
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-800 text-white"
                                            } shadow`}
                                    >
                                        <p className="text-sm">{chat.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Box */}
                        <div className="border-t border-gray-700 flex items-center bg-slate-800">
                            <Input
                                className="w-full h-full px-4 py-2 text-white bg-slate-800 outline-none placeholder-gray-400"
                                placeholder="Write a message..."
                                onChange={(e) => setInputValue(e.target.value)}
                                value={inputValue}
                                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            />
                            <Button
                                className="h-full px-5 text-white"
                                variant="ghost"
                                onClick={handleSendMessage}
                            >
                                <Send size={20} />
                            </Button>
                        </div>
                    </div>
                )}
                {/* Chatbot Toggle Button */}
                <div className="relative w-40 cursor-pointer">
                    <Button onClick={handleBotRelease} className="w-full h-12 gap-2 items-center bg-blue-600 text-white">
                        <MessageCircle size={30} className="fill-white -rotate-90 stroke-none" />
                        <span className="text-2xl font-semibold">Coin Bot</span>
                    </Button>
                </div>
            </section>

        </div>
    );
};

export default Home;
