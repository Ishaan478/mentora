"use client"

import { generateQuiz, saveQuizResult } from "@/actions/mocktest";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/use-fetch";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { toast } from "sonner";
import QuizResult from "./quiz-result";

const Quiz = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([])
    const [showExplanation, setShowExplanation] = useState(false)

    const {
        loading: generatingQuiz,
        fn: generateQuizFn,
        data: quizData,
    } = useFetch(generateQuiz);

    const {
        loading: savingResult,
        fn: savedQuizResultFn,
        data: resultData,
        setData: setResultData,
    } = useFetch(saveQuizResult)

    console.log(resultData);

    useEffect(() => {
        if (quizData) {
            setAnswers(new Array(quizData.length).fill(null))
        }
    }, [quizData])

    const handleAnswer = (answer) => {
        const newAnswers = [...answers]
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers)
    }

    const handleNext = (answer) => {
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
            setShowExplanation(false)
        } else {
            finishQuiz();
        }
    }

    const calculateScore = () => {
        let correct = 0;
        answers.forEach((answer, index) => {
            if (answer === quizData[index].correctAnswer) {
                correct++;
            }
        })
        return (correct / quizData.length) * 100
    }

    const finishQuiz = async () => {
        const score = calculateScore();
        try {
            await savedQuizResultFn(quizData, answers, score)
            toast.success("Quiz completed")

        } catch (error) {
            toast.error(error.message || "Failed to save results");
        }
    }

    const startNewQuiz = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowExplanation(false);
        generateQuizFn();
        setResultData(null);
    };


    if (generatingQuiz) {
        return <HashLoader className='mt-4' width={"100%"} color="gray" />
    }

    if (resultData) {
        return (
            <div className="mx-2">
                <QuizResult result={resultData} onStartNew={startNewQuiz} />
            </div>
        )
    }

    if (!quizData) {
        return (
            <Card className="mx-2">
                <CardHeader>
                    <CardTitle>Ready to see how much you know ?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">You'll answer 10 industry-specific question designed around your skills. Proceed at your own pace  and choose your best response for each one.</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full transition-all duration-300 hover:shadow-lg hover:scale-105" onClick={generateQuizFn}>Start Quiz</Button>
                </CardFooter>
            </Card>
        )
    }

    const question = quizData[currentQuestion]

    return (
        <Card className="mx-2">
            <CardHeader>
                <CardTitle> Question {currentQuestion + 1} of {quizData.length} </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-lg font-medium">{question.question}</p>

                <RadioGroup
                    className="space-y-2" onValueChange={handleAnswer}
                    value={answers[currentQuestion]}>
                    {question.options.map((option, index) => {
                        return (
                            <div className="flex items-center space-x-2" key={index}>
                                <RadioGroupItem value={option} id={`option-${index}`} />
                                <Label htmlFor={`option-${index}`}>{option}</Label>
                            </div>
                        )
                    })}
                </RadioGroup>

                {showExplanation && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                        <p className="fonr-medium">Explanation:</p>
                        <p className="text-muted-foreground">{question.explanation}</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
                {!showExplanation && (
                    <Button
                        onClick={() => setShowExplanation(true)}
                        variant="outline"
                        disabled={!answers[currentQuestion]}
                    >
                        Show Explanation
                    </Button>
                )}
                <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion] || savingResult}
                    className="ml-auto"
                >
                    {savingResult && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {currentQuestion < quizData.length - 1
                        ? "Next Question"
                        : "Finish Quiz"}
                </Button>
            </CardFooter>

        </Card>
    )
}

export default Quiz
