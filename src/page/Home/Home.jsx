import { Button } from '@/components/ui/button';
import AssetTable from './AssetTable';
import StockChart from './StockChart';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Cross1Icon, DotIcon } from '@radix-ui/react-icons';
import { MessageCircle } from 'lucide-react';
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
import { getBusinessNews, getCryptoNews } from '@/State/News/Action';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const Home = () => {
    const [category, setCategory] = useState("all");
    const [inputValue, setInputValue] = useState("");
    const [isBotRelease, setIsBotRelease] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const { coin, news } = useSelector((store) => store);
    const dispatch = useDispatch();

    const handleBotRelease = () => setIsBotRelease(!isBotRelease);
    const handleCategory = (value) => setCategory(value);
    const handleChange = (e) => setInputValue(e.target.value);
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            console.log(inputValue);
            setInputValue("");
        }
    };

    useEffect(() => {
        dispatch(getTop50CoinList());
    }, [category]);

    useEffect(() => {
        dispatch(getCoinList(currentPage));
    }, [currentPage]);

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            dispatch(getBusinessNews(jwt));
            dispatch(getCryptoNews(jwt));
        } else {
            console.error("JWT token not found in localStorage");
        }
    }, []);


    // useEffect(() => {
    //     const fetchNews = async () => {
    //         const jwt = localStorage.getItem("jwt");

    //         if (!jwt) {
    //             console.error("JWT token not found in localStorage");
    //             return;
    //         }

    //         try {
    //             dispatch(getCryptoNews(jwt));
    //         } catch (error) {
    //             console.error("Failed to load crypto news:", error);
    //         }
    //     };

    //     fetchNews();
    // }, []);

    // useEffect(() => {
    //     const fetchNews = async () => {
    //         const jwt = localStorage.getItem("jwt");

    //         if (!jwt) {
    //             console.error("JWT token not found in localStorage");
    //             return;
    //         }

    //         try {
    //             dispatch(getBusinessNews(jwt));
    //         } catch (error) {
    //             console.error("Failed to load business news:", error);
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
            <div className="relative p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Business News */}
                    <div className="lg:w-1/2">
                        <h2 className="text-xl font-bold mb-4">BUSINESS NEWS</h2>
                        {news.businessArticles?.map((item, index) => (
                            <Card key={index} className="mb-6 border shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 flex">
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-32 h-32 object-cover rounded-l-md"
                                    />
                                )}
                                <div className="flex-1 p-4">
                                    <CardTitle className="text-lg font-semibold hover:underline">{item.title}</CardTitle>
                                    <CardDescription className="text-sm text-gray-500">{new Date(item.publishedAt).toLocaleDateString()}</CardDescription>
                                    <CardContent>
                                        <p className="text-gray-700 mb-2">{item.description}</p>
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read more</a>
                                    </CardContent>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Crypto News */}
                    <div className="lg:w-1/2">
                        <h2 className="text-xl font-bold mb-4">CRYPTO NEWS</h2>
                        {news.cryptoArticles?.map((article, index) => (
                            <Card key={index} className="mb-6 border shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 flex">
                                {article.image && (
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-32 h-32 object-cover rounded-l-md"
                                    />
                                )}
                                <div className="flex-1 p-4">
                                    <CardTitle className="text-lg font-semibold hover:underline">{article.title}</CardTitle>
                                    <CardDescription className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</CardDescription>
                                    <CardContent>
                                        <p className="text-gray-700 mb-2">{article.description}</p>
                                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read more</a>
                                    </CardContent>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>



            {/* Chatbot Section */}
            <section className="fixed bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
                {isBotRelease && (
                    <div className="rounded-md w-72 md:w-80 h-80 md:h-[70vh] bg-slate-900">
                        <div className="flex justify-between items-center border-b px-6 h-12">
                            <p>Chat Bot</p>
                            <Button onClick={handleBotRelease} variant="ghost" size="icon">
                                <Cross1Icon />
                            </Button>
                        </div>
                        <div className="flex flex-col overflow-y-auto gap-5 px-5 py-2 h-64 md:h-[76%] scroll-container">
                            <div className="self-start pb-5 w-auto">
                                <div className="px-5 py-2 rounded-md bg-slate-800 w-auto">
                                    <p>Hi, Market Zen</p>
                                    <p>You can ask crypto-related questions</p>
                                </div>
                            </div>
                            {[1, 1, 1, 1].map((item, i) => (
                                <div key={i} className={`${i % 2 === 0 ? "self-start" : "self-end"} pb-5 w-auto`}>
                                    <div className="px-5 py-2 rounded-md bg-slate-800 w-auto">
                                        <p>{i % 2 === 0 ? "Prompt: Who are you?" : "Answer: Hi, Market Zen"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t h-12">
                            <Input
                                className="w-full h-full outline-none"
                                placeholder="Write prompt"
                                onChange={handleChange}
                                value={inputValue}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                    </div>
                )}

                <div className="relative w-40 cursor-pointer">
                    <Button onClick={handleBotRelease} className="w-full h-12 gap-2 items-center">
                        <MessageCircle size={30} className="fill-[#1e293b] -rotate-90 stroke-none" />
                        <span className="text-2xl">Chat Bot</span>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Home;
