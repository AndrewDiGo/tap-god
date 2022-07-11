import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import "./App.css";
import Box from "./components/box";
import Header from "./components/header";
import ModalCustom from "./components/modal";
import balloon from "./images/balloon-red.png";
import thumbTacks from "./images/cactus.png";
import balloonPop from "./images/balloon-pop.png";
import soundPop from "./sounds/pop-sound.wav";
import soundOuch from "./sounds/ouch-sound.mp3";

const App = () => {
  const [boxes, setBoxes] = useState([]);
  const [boxConfigList, setBoxConfigList] = useState([]);
  const [score, setScore] = useState(10);
  const [timer, setTimer] = useState(10);
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const popAudio = new Audio(soundPop);
  const ouchAudio = new Audio(soundOuch);

  useEffect(() => {
    configureStart();
  }, []);

  const configureStart = () => {
    let highScore = JSON.parse(localStorage.getItem("SCORE"));

    if (highScore) {
      setHighScore(highScore);
    }

    if (boxConfigList.length === 0) {
      let config = [];
      for (let index = 0; index < 10; index++) {
        config.push({
          name: "balloon",
          logo: balloon,
        });
      }

      for (let index = 0; index < 6; index++) {
        config.push({
          name: "thumbtacks",
          logo: thumbTacks,
        });
      }

      setBoxConfigList(config);
    }
  };

  useEffect(() => {
    const clone = [...boxConfigList];

    if (clone.length) {
      const s = setInterval(() => {
        let boxes = [];
        let newItems = clone;
        for (let index = 0; index < 16; index++) {
          let logoData = getLogo(newItems);
          newItems = logoData.items;
          boxes.push({
            id: index + 1,
            name: logoData.logo.name,
            logo: logoData.logo.logo,
          });
        }

        setBoxes(boxes);

        clearInterval(s);
      }, getInterval());

      if (timer === 0 || score === 0) {
        clearInterval(s);
      }
    }
  }, [boxConfigList, timer]);

  useEffect(() => {
    setTimeout(
      () => {
        configureTimer();
      },
      timer === 10 ? 1000 : 0
    );
  }, [timer]);

  const configureTimer = () => {
    const s = setInterval(() => {
      setTimer((time) => time - 1);

      clearInterval(s);
    }, 1000);

    if (timer === 0 || score === 0) {
      clearInterval(s);
    } else {
      if (timer < 10) {
        if (score - 1 * level <= 0) {
          setScore(0);
        } else {
          setScore(score - 2 * level);
        }
      }
    }
  };

  const getInterval = () => {
    let interval = 1000 - (level - 1) * 100;
    return interval;
  };

  const getLogo = (items) => {
    let index = Math.floor(Math.random() * items.length);
    const logo = items[index];
    items.splice(index, 1);

    return {
      logo: logo,
      items: items,
    };
  };

  const handleClickEvent = (id) => {
    let itemIndex;
    let boxItem = boxes.filter((box, index) => {
      if (box.id == id) {
        itemIndex = index;

        return box;
      }
    })[0];

    if (boxItem.name === "balloon") {
      popAudio.play();
      boxItem.name = "pop";
      boxItem.logo = balloonPop;

      setScore(score + 5);
    } else if (boxItem.name === "thumbtacks") {
      ouchAudio.play();
      const scoreCopy = score - 3;
      if (scoreCopy <= 0) setScore(0);
      else setScore(scoreCopy);
    }

    let boxesCopy = [...boxes];
    boxesCopy[itemIndex] = boxItem;
    setBoxes(boxesCopy);
  };

  const startNextLevel = () => {
    if (level < 10) {
      if (score == 0) {
        console.log("Hey");
        let highScore = JSON.parse(localStorage.getItem("SCORE"));

        if (highScore) {
          if (score > highScore) localStorage.setItem("SCORE", score);
        } else {
          localStorage.setItem("SCORE", 0);
        }

        setScore(10);
        setLevel(1);
      } else if (level < 10) {
        setLevel(level + 1);
        configureStart();
      }
    } else {
      console.log("Hey Hey");
      let highScore = JSON.parse(localStorage.getItem("SCORE"));

      if (highScore) {
        if (score > highScore) localStorage.setItem("SCORE", score);
      } else {
        localStorage.setItem("SCORE", 0);
      }

      setLevel(1);
      setScore(0);
    }

    setTimer(10);
    configureStart();
  };

  return (
    <div className="App">
      <Header data={{ score, timer, level }} />
      <ModalCustom
        score={score}
        timer={timer}
        level={level}
        highScore={highScore}
        startNextLevel={() => startNextLevel()}
      />
      <div id="box-parent" className="row">
        {boxes.map((box) => {
          return (
            <Box
              key={box.id}
              box={box}
              handleClickEvent={() => handleClickEvent(box.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
