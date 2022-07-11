import { useEffect, useRef, useState } from "react";
import soundRoundEnd from "../sounds/round-end-sound.wav";

function ModalCustom(props) {
  const btnElement = useRef();
  const roundEndAudio = new Audio(soundRoundEnd);

  useEffect(() => {
    if (props.timer === 0 || props.score === 0) triggerClick();
  }, [props.timer]);

  const triggerClick = () => {
    btnElement.current.click();
    roundEndAudio.play();
  };

  return (
    <div>
      <button
        type="button"
        id="btn-score"
        ref={btnElement}
        className="btn btn-primary invisible"
        data-toggle="modal"
        data-target="#modal-score"
      >
        Large modal
      </button>
      <div
        className="modal fade"
        id="modal-score"
        role="dialog"
        data-backdrop="static"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="exampleModalCenterTitle">
                {props.score === 0
                  ? "Game Over"
                  : props.level == 10
                  ? "Your Final Score is"
                  : "Your Score"}
              </h2>
            </div>
            <div className="modal-body text-center">
              <h1>{props.score}</h1>
              <br />
              <h2>Your old high score is: {props.highScore}</h2>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-lg btn-primary"
                data-dismiss="modal"
                onClick={props.startNextLevel}
              >
                {props.level === 10 || props.score === 0
                  ? "Restart"
                  : "Start Level " + parseInt(props.level + 1)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCustom;
