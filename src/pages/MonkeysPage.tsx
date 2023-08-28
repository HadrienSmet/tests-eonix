import { useEffect, useRef, useState } from "react";

import { Monkey, Spectator, Trainer } from "../classes/Trainer";
import { ListType } from "../types/ListType";

import TrainerDiv from "../components/welcomePage/TrainerDiv";
import sashaImg from "../assests/images/sasha.png";
import trainerImg from "../assests/images/tainer.png";
import mojojojoImg from "../assests/images/mojo-jojo.webp";
import rafikiImg from "../assests/images/rafiki.jpg";
import spectatorImg from "../assests/images/spectator.png";

const firstOrdersList = [
    { order: "Marche sur les mains", type: "acrobatics" },
    { order: "Fais du monocycle", type: "acrobatics" },
    { order: "Fais un cumulet", type: "acrobatics" },
    { order: "Joue avec les cymbales", type: "music" },
    { order: "Joue aves les maracas", type: "music" },
    { order: "Joue du tambour", type: "music" },
];
const scdOrdersList = [
    { order: "Fais le moonwalk", type: "acrobatics" },
    { order: "Jongle avec des balles", type: "acrobatics" },
    { order: "Tiens en équilibre sur une balle", type: "acrobatics" },
    { order: "Joue de la trompette", type: "music" },
    { order: "Joue du piano", type: "music" },
    { order: "Joue du tam-tam", type: "music" },
];

const firstMonkey = new Monkey("Sasha", "Mojo Jojo", firstOrdersList);
const firstTrainer = new Trainer("Sasha", firstOrdersList, firstMonkey);
const scdMonkey = new Monkey("Jack", "Rafiki", scdOrdersList);
const scdTrainer = new Trainer("Jack", scdOrdersList, scdMonkey);
const spectator = new Spectator("Hadri");

const useMonkeysPage = () => {
    const [randomIndex, setRandomIndex] = useState(0);
    const [turnIndex, setTurnIndex] = useState(0);
    const [stepIndex, setStepIndex] = useState(0);
    const [details, setDetails] = useState("");
    const specDivRef = useRef<HTMLDivElement | null>(null);
    const sachaRef = useRef<HTMLImageElement | null>(null);
    const mojojojoRef = useRef<HTMLImageElement | null>(null);
    const trainerRef = useRef<HTMLImageElement | null>(null);
    const rafikiRef = useRef<HTMLImageElement | null>(null);
    const spectatorRef = useRef<HTMLImageElement | null>(null);

    const removeAnimationClass = () => {
        sachaRef.current?.classList.remove("in-action");
        mojojojoRef.current?.classList.remove("in-action");
        trainerRef.current?.classList.remove("in-action");
        rafikiRef.current?.classList.remove("in-action");
        spectatorRef.current?.classList.remove("in-action");
    };

    const handleStep = (
        trainer: Trainer,
        monkey: Monkey,
        turn: number,
        randomIndex: number,
        list: ListType
    ) => {
        removeAnimationClass();
        if (turn % 4 === 0) {
            const currenttrainer = turnIndex % 2 === 0 ? sachaRef : trainerRef;
            currenttrainer.current?.classList.add("in-action");
            setDetails(trainer.order(randomIndex));
        } else if (turn % 4 === 1) {
            const currentMonkey = turnIndex % 2 === 0 ? mojojojoRef : rafikiRef;
            currentMonkey.current?.classList.add("in-action");
            setDetails(monkey.obey(randomIndex));
        } else if (turn % 4 === 2) {
            spectatorRef.current?.classList.add("in-action");
            setDetails(spectator.reacts(list[randomIndex].type, monkey.name));
        }
    };
    const handleTurn = () => {
        setStepIndex((state) => state + 1);
        const rightList = turnIndex % 2 === 0 ? firstOrdersList : scdOrdersList;
        const rightTrainer = turnIndex % 2 === 0 ? firstTrainer : scdTrainer;
        const rightMonkey = turnIndex % 2 === 0 ? firstMonkey : scdMonkey;

        handleStep(
            rightTrainer,
            rightMonkey,
            stepIndex,
            randomIndex,
            rightList
        );
    };

    useEffect(() => {
        if (stepIndex % 4 === 0) {
            setRandomIndex(Math.floor(Math.random() * 6));
            specDivRef.current?.classList.add("center");
            if (stepIndex === 0) {
                setDetails("Cliquez sur le boutton pour commencer");
            } else {
                setDetails("Le dresseur suivant se prépare...");
                setTurnIndex((state) => state + 1);
            }
        }
    }, [stepIndex]);

    useEffect(() => {
        specDivRef.current?.classList.remove("center");
        specDivRef.current?.classList.remove("right");
        if (turnIndex % 2 !== 0 && stepIndex % 4 !== 0) {
            specDivRef.current?.classList.add("right");
        }
        if (stepIndex % 4 === 0) {
            specDivRef.current?.classList.add("center");
        }
    }, [turnIndex, stepIndex]);

    return {
        details,
        stepIndex,
        specDivRef,
        sachaRef,
        mojojojoRef,
        trainerRef,
        rafikiRef,
        spectatorRef,
        handleTurn,
    };
};

const MonkeysPage = () => {
    const {
        details,
        stepIndex,
        specDivRef,
        sachaRef,
        mojojojoRef,
        trainerRef,
        rafikiRef,
        spectatorRef,
        handleTurn,
    } = useMonkeysPage();
    return (
        <main className="monkeys-page">
            <h1>Spectacle de dresseurs de singe.</h1>
            <div className="monkeys-page__content">
                <p>
                    Un spectateur rencontre deux dresseurs de singes accompagnés
                    de leur singe.
                    <br />
                    Le singe agit sur l'ordre de son maître et fait soit de la
                    musique soit une acrobatie.
                    <br />
                    Le spectateur applaudit à chaque acrobatie et siffle à
                    chaque musique.
                </p>
                <div className="action-displayer">
                    <div className="scene-displayer">
                        <div className="trainers-div">
                            <TrainerDiv
                                trainerImg={sashaImg}
                                trainerRef={sachaRef}
                                monkeyImg={mojojojoImg}
                                monkeyRef={mojojojoRef}
                            />
                            <TrainerDiv
                                trainerImg={trainerImg}
                                trainerRef={trainerRef}
                                monkeyImg={rafikiImg}
                                monkeyRef={rafikiRef}
                            />
                        </div>
                        <div ref={specDivRef} className="spectator-div">
                            <img
                                ref={spectatorRef}
                                src={spectatorImg}
                                alt="spectator illu"
                            />
                        </div>
                    </div>
                    <div className="details-displayer">
                        <p>{details}</p>
                        <button onClick={handleTurn}>
                            {stepIndex === 0 ? "Start" : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MonkeysPage;
