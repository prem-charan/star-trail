import { useEffect, useState } from "react";

export default function App() {
    const star_cnt = 816;
    const fade_duration = 700;

    const [hoverTimes, setHoverTimes] = useState(Array(star_cnt).fill(0));
    const [now, setNow] = useState(() => Date.now());
    const [isHovering, setIsHovering] = useState(Array(star_cnt).fill(false));
    
    useEffect(() => {
        const id = setInterval(() => {
            setNow(Date.now());
        }, 50);
        
        return () => clearInterval(id);
    }, [])

    const handleEnter = (index: number) => {
        setHoverTimes((prev) => {
            const updated = [...prev];
            updated[index] = Date.now();
            return updated;
        });
        
        setIsHovering((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
        })
    };
    
    const handleLeave = (index: number) => {
        setIsHovering((prev) => {
            const updated = [...prev];
            updated[index] = false;
            return updated;
        });
    };
    
    const rainbow = [
        "#e81416",
        "#ffa500",
        "#faeb36",
        "#79c314",
        "#487de7",
        "#4b369d",
        "#70369d"
    ]
    
    const steps = rainbow.length;
    
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="text-3xl momo-signature-regular mb-25">Yoo,</div>
            <div className="w-180 flex overflow-hidden -mt-24">
                <div className="grid grid-cols-51 gap-x-5 text-[24px] leading-none">
                    {Array.from({ length: star_cnt }).map((_, i) => {
                        const lastHoveredAgo = now - hoverTimes[i];
                        let color = "#b6b6b6";
                        
                        if (isHovering[i]) {
                            color = rainbow[0];
                        } else if (lastHoveredAgo < fade_duration) {
                            const progress = lastHoveredAgo / fade_duration;
                            const index = Math.floor(progress * steps);
                            color = rainbow[Math.min(index, steps - 1)];
                        }

                        return (
                            <div
                                key={i}
                                onMouseEnter={() => handleEnter(i)}
                                onMouseLeave={() => handleLeave(i)}
                                className="transition-colors ease-in-out cursor-default"
                                style={{color}}
                            >★</div>
                        );
                    })}
                </div>
            </div>
            <div className="momo-signature-regular mt-2 flex gap-1.5">
                - move your <p className="text-[#e81416]">cursor</p> and see the <p className="text-[#487de7]">magic</p> 
            </div>
            <div className="absolute bottom-0 flex gap-2 mb-2">
                <p className="momo-signature-regular">made by </p>
                <a className="hover:underline hover:decoration-2 hover:decoration-blue-600" href="https://x.com/premxcharan" target="_blank"> premcharan</a>
            </div>
        </div>
    );
}
