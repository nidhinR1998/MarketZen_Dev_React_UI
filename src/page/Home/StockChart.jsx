import { Button } from '@/components/ui/button';
import React from 'react'
import ReactApexChart from 'react-apexcharts';
import { useState } from 'react';


const timeSeries = [
    {
        keyword: "DIGITAL_CURRENCY_DAILY",
        key: "Time Series (Daily)",
        lable: "1 Day",
        value: 1,
    },
    {
        keyword: "DIGITAL_CURRENCY_WEEKLY",
        key: "Weekly Time Series",
        lable: "1 Week",
        value: 7,
    },
    {
        keyword: "DIGITAL_CURRENCY_MONTHLY",
        key: "Monthly Time Series",
        lable: "1 Month",
        value: 30,
    },
];

const StockChart = () => {
    const [activeLable,setActiveLable]=useState("1 Day");
    const searies=[
        {
            data:[
            [1726211136320, 57852.4240422049],
            [1726214446813, 57999.5333891273],
            [1726218018119, 57949.0642699431],
            [1726221863662, 58089.1137787672],
            [1726226591893, 58218.4894263018],
            [1726229549025, 57819.3077189709],
            [1726232775950, 57926.4602871863],
            [1726236094046, 58054.0311843294],
            [1726240227063, 58449.9347652907],
            [1726244352119, 59593.3669690775],
            [1726248477190, 59634.5833800222],
            [1726250625831, 59600.1771994508],
            [1726254882363, 59805.6048972814],
            [1726258307201, 59675.7554707808],
            [1726261574778, 59886.5417792738],
            [1726265272592, 60431.2809888508],
            [1726269534265, 60414.2897761007],
            [1726272037743, 60620.6274729575],
            [1726276741865, 60590.8654365476],
            [1726280502164, 60480.4626092319],
            [1726284114918, 60419.1290829848],
            [1726287195135, 60334.796787248],
            [1726291074678, 60240.2735199662],
            [1726294419026, 60001.1505106023],
            [1726297562185, 60026.4327908189],
            [1726302372408, 60070.485574961],
            [1726305936898, 59968.4169699846],
            [1726308445118, 60014.0082858738],
            [1726311972821, 59819.9025068186],
            [1726316278030, 59794.7542782444],
            [1726319174982, 59776.1596579639],
            [1726323051966, 59793.0562042005],
            [1726326919915, 59966.6076767306],
            [1726329781239, 59890.3065264775],
            [1726334063409, 59910.7763614139],
            [1726337348526, 59841.350867612],
            [1726341469291, 59780.4487339136],
            [1726344240302, 59823.3317555234],
            [1726348529737, 59975.2697866929],
            [1726351398412, 60064.7526454376],
            [1726355699906, 60064.432134572],
            [1726358509855, 60013.882041044],
            [1726362807988, 60126.5043413439],
            [1726366717761, 60169.7989971774],
            [1726370033203, 60220.1435558819],
            [1726373696688, 60209.4001153245],
            [1726377434781, 60174.848181359],
            [1726381340532, 60152.179161967],
            [1726384976679, 60152.5005642842],
            [1726387319601, 60204.4991581917],
            [1726391917629, 60070.6997081373],
            [1726395821125, 59980.0111721012],
            [1726398074828, 59997.7483040153],
            [1726402575480, 59972.1709266907],
            [1726405536730, 60080.5402176058],
            [1726409817359, 60020.8035227435],
            [1726413894489, 60251.8983351663],
            [1726417465749, 60241.0446218171],
            [1726420549458, 59867.1727116239],
            [1726424293288, 59817.6393165372],
            [1726427203254, 60139.4955824195],
            [1726431955554, 59934.8963018575],
            [1726434587921, 59622.2393902769],
            [1726439087952, 59418.2160857205],
            [1726442523408, 58949.1136973008],
            [1726445743588, 58962.8632437768],
            [1726449099651, 58689.4390599853],
            [1726453548462, 58442.9634176284],
            [1726457201959, 58373.3558433086],
            [1726459219970, 58579.5839619082],
            [1726463009466, 58321.0953563794],
            [1726466505778, 58602.9307959358],
            [1726470272052, 58680.7927891159],
            [1726474545266, 58929.7644801984],
            [1726477906676, 58982.5254392561],
            [1726482051296, 58610.714110205],
            [1726485700466, 58800.5416095956],
            [1726488948316, 58765.1281761812],
            [1726493336531, 58499.6465063991],
            [1726496487555, 58374.725818389],
            [1726500254957, 57912.7773573681],
            [1726503201957, 57905.6732065607],
            [1726506083393, 57860.0779401366],
            [1726509877581, 58176.378902083],
            [1726513446307, 57863.9525092543],
            [1726517215189, 57890.4488502439],
            [1726522229472, 57884.5331247251],
            [1726525484764, 57986.0834748486],
            [1726529204166, 58236.2574455785],
            [1726532783218, 58251.2726743643],
            [1726536122024, 57767.782268838],
            [1726539638398, 57839.4809739363],
            [1726542950113, 58098.1669918313],
            [1726546334393, 58129.3536886104],
            [1726549626172, 58264.6183081536],
            [1726553323996, 58532.7087220016],
            [1726557123933, 58569.7183599432],
            [1726561098919, 58790.0900470166],
            [1726564918164, 58722.1625384735],
            [1726568892059, 59094.1492371347],
            [1726572224052, 59055.5353167172],
            [1726575232489, 59228.508480328],
            [1726579382451, 59284.7550033675],
            [1726582077073, 59163.7795571565],
            [1726586765619, 61231.6212971013],
            [1726589249396, 61202.0196856892],
            [1726592419953, 60970.2534814402],
            [1726596483383, 60976.8573746607],
            [1726600341842, 60563.4158309977],
            [1726604299992, 59973.9506205091],
            [1726608548124, 60375.0369547322],
            [1726612102530, 60174.66622544],
            [1726615649414, 60155.6441169595],
            [1726618946634, 60061.8848560052],
            
        ],
        },
    ];

    const options = {
        chart:{
            id:"area-datetime",
            type:"area",
            height:350,
            zoom:{
                autoScaleYaxis:true
            }
        },
        dataLabels:{
            enabled:false
        },
        xaxis:{
            type:"datetime",
            tickAmount:6
        },
        colors:["#758AA2"],
        markers:{
            colors:["#fff"],
            strokeColor:"#fff",
            size:0,
            strokeWidth:1,
            style:"hollow"
        },
        tooltip:{
            theme:"dark"
        },
        fill:{
            type:"gradient",
            gradient:{
                shadeIntensity:1,
                opacityFrom:0.7,
                opacityTo:0.9,
                stops:[0,100]
            }
        },
        grid:{
            borderColor:"#47535E",
            strokeDashArray: 4,
            show: true
        }
    };

    const handleActiveLable=(value)=>{
        setActiveLable(value);

    }
    return (
        <div>

            <div className="space-x-3">
                {timeSeries.map((item)=><Button
                variant={activeLable==item.lable?"":"outline"}
                onClick={()=>handleActiveLable(item.lable)} key={item.lable}>
                    {item.lable}

                </Button>)}

            </div>

            <div id="chart-timelines">
                <ReactApexChart
                    options={options}
                    series={searies}
                    height={450}
                    type="area"

                />

            </div>

        </div>
    );


};

export default StockChart;