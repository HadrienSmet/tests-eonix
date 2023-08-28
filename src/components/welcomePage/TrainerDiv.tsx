type PropsType = {
    trainerImg: string;
    trainerRef: React.MutableRefObject<HTMLImageElement | null>;
    monkeyImg: string;
    monkeyRef: React.MutableRefObject<HTMLImageElement | null>;
};

const TrainerDiv = ({
    trainerImg,
    trainerRef,
    monkeyImg,
    monkeyRef,
}: PropsType) => {
    return (
        <div className="trainer-division">
            <img ref={trainerRef} src={trainerImg} alt="Image de dresseur" />
            <img ref={monkeyRef} src={monkeyImg} alt="Image de singe" />
        </div>
    );
};

export default TrainerDiv;
