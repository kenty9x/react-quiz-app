import React, { use } from "react";
const Results = (props) => {
    return (
        <div>
            <h2>Kết quả của bạn</h2>
            <p className="result">Bạn đã hoàn thành bài quiz. Số điểm của bạn là: {props.score}/{props.total}</p>
            <div className="resultButtonsContainer">
                <button className="result-button" onClick={props.reviewAnswers}>Xem kết quả</button>
                <button className="result-button" onClick={props.restartQuiz}>Làm lại</button>
            </div>
        </div>
    );
}

export default Results;