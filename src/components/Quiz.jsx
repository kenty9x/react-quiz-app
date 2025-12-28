import React, { use } from "react";
import Results from './Results'

const quizData = [
  {
    question: "Biến nào sau đây là hợp lệ trong JavaScript?",
    options: ["1variable", "_variable", "var-name", "var name"],
    answer: "_variable",
  },
  {
    question:
      "Trong JavaScript, kiểu dữ liệu nào sau đây là kiểu dữ liệu nguyên thủy (primitive)?",
    options: ["object", "array", "string", "function"],
    answer: "string",
  },
  {
    question:
      "Thuật toán sắp xếp nào sau đây có độ phức tạp trung bình là O(n log n)?",
    options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Linear Sort"],
    answer: "Merge Sort",
  },
  {
    question: "Kết quả của `typeof null` trong JavaScript là gì?",
    options: ["'null'", "'undefined'", "'object'", "'number'"],
    answer: "'object'",
  },
  {
    question: "Bộ nhớ Stack dùng để làm gì?",
    options: [
      "Lưu trữ dữ liệu dạng hàng đợi",
      "Lưu trữ các lời gọi hàm (function calls)",
      "Lưu ảnh",
      "Lưu video",
    ],
    answer: "Lưu trữ các lời gọi hàm (function calls)",
  },
  {
    question: "Toán tử nào so sánh nghiêm ngặt giá trị và kiểu dữ liệu?",
    options: ["==", "===", "!=", "="],
    answer: "===",
  },
  {
    question: "JSON là viết tắt của gì?",
    options: [
      "Java Syntax Object Notation",
      "JavaScript Object Notation",
      "JavaScript Online Network",
      "Java Server Object Notation",
    ],
    answer: "JavaScript Object Notation",
  },
  {
    question:
      "Cấu trúc dữ liệu nào hoạt động theo nguyên tắc FIFO (First In First Out)?",
    options: ["Stack", "Queue", "Array", "Linked List"],
    answer: "Queue",
  },
  {
    question: "Câu lệnh nào in ra nội dung trong console trình duyệt?",
    options: ["print()", "console.log()", "echo()", "show()"],
    answer: "console.log()",
  },
  {
    question: "Khi bạn viết `let x;` trong JavaScript, giá trị ban đầu của x là gì?",
    options: ["null", "0", "undefined", "false"],
    answer: "undefined",
  },
  {
    question: "HTML là gì?",
    options: [
      "Ngôn ngữ lập trình để xử lý logic",
      "Ngôn ngữ đánh dấu để tạo cấu trúc website",
      "Framework của JavaScript",
      "Trình duyệt web",
    ],
    answer: "Ngôn ngữ đánh dấu để tạo cấu trúc website",
  },
  {
    question: "Trong thuật toán, Big O dùng để đo gì?",
    options: [
      "Tốc độ mạng",
      "Thời gian load ảnh",
      "Độ phức tạp của thuật toán",
      "Dung lượng RAM máy tính",
    ],
    answer: "Độ phức tạp của thuật toán",
  },
];

const Quiz = () => {
    const [OptionSelected, setOptionSelected] = React.useState(null);
    const [userAnswers, setUserAnswers] = React.useState(
        Array.from({ length: quizData.length }, () => null)
    );

    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

    const [isQuizFinished, setIsQuizFinished] = React.useState(false);

    const handleSelectedOption = (option, index) => {
        setOptionSelected(option);
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = index;
        setUserAnswers(updatedAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
        else {
            setIsQuizFinished(true);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers(Array.from({ length: quizData.length }, () => null));
        setOptionSelected(null);
        setIsQuizFinished(false);
    }

    const reviewAnswers = () => {
        setCurrentQuestionIndex(0);
        setIsQuizFinished(false);
    }


    React.useEffect(() => {
        setOptionSelected(userAnswers[currentQuestionIndex] !== null ? quizData[currentQuestionIndex].options[userAnswers[currentQuestionIndex]] : null);
    }, [currentQuestionIndex, userAnswers]);

    if (isQuizFinished) return ( 
        <Results 
            score={userAnswers.filter((answer, index) => answer !== null && quizData[index].options[answer] === quizData[index].answer).length} 
            total={quizData.length} 
            restartQuiz={restartQuiz}
            reviewAnswers={reviewAnswers}
        />
    );

    return (
        <div>
            <h2>Câu {currentQuestionIndex + 1}:</h2>
            <p className="question">{quizData[currentQuestionIndex].question}</p>
            {quizData[currentQuestionIndex].options.map((option, index) => (
                <button 
                    key={option}
                    className={`option ${OptionSelected === option ? "selected" : ""}`}
                    disabled={!!OptionSelected && OptionSelected !== option}
                    onClick={() => handleSelectedOption(option, index)}
                >
                    {option}
                </button>
            ))}

            {
                OptionSelected === quizData[currentQuestionIndex].answer ? (
                    <p className="correct-answer">Đáp án đúng!</p>
                ) : OptionSelected ? (
                    <p className="incorrect-answer">Đáp án sai. Đáp án đúng là: {quizData[currentQuestionIndex].answer}</p>
                ) : null
            }

            <p>Selected option: {OptionSelected}</p>

            <div className="nav-buttons">
                <button className="nav-button" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
                <button className="nav-button" onClick={handleNextQuestion} disabled={OptionSelected === null}>
                    {currentQuestionIndex === quizData.length - 1 ? "Finish" : "Next"}
                </button>
            </div>
        </div>
    );
}

export default Quiz;