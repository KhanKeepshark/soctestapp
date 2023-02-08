


import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../http/questionAPI';
import { fetchUserChoice } from '../http/userChoiceAPI';
import { fetchAnswers } from '../http/answerAPI';
import { fetchUsers } from '../http/userAPI';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Col, Form, Row } from 'react-bootstrap';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
};


const Q7BarChart = () => { 

    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [userData, setUserData] = useState([])
    const [userChoices, setUserChoices] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState([])

    useEffect(()=>{
        fetchUsers().then(data => setUserData(data.map(role => role.role != "ADMIN" ? role : "")))
        fetchQuestions().then(data => setQuestions(data))
        fetchAnswers().then(data => setAnswers(data))
        fetchUserChoice().then(data => setUserChoices(data))
    }, [])

    const test = userChoices.map(i => i.questionChoice === currentQuestion ? i.answerChoice : null).filter(i=> i != null).reduce((acc, n) => (acc[n] = (acc[n] || 0)+1, acc), {})

    const select = [...new Set(userChoices.map(type => type.order === 1 ? type.questionChoice : null).filter(i=> i != null))]

    const labels = Object.keys(test)
    
    const data = {
        labels,
        datasets: [
          {
            label: currentQuestion,
            data: Object.values(test),
            backgroundColor: 'rgb(54, 162, 235, 0.7)',
            borderColor: 'rgb(255, 99, 132)',
          },
          
        ],
      };
    

  return (
    <div style={{height: "400px"}}>
        <Row className='mt-4' >
            <Col md={8}>
              <Bar options={{ options }} data={data} />
            </Col>
            <Col md={4}>
                <Form.Select
                    className="mt-3"
                    value={currentQuestion}
                    onChange={e => setCurrentQuestion(e.target.value)} 
                >
                    <option hidden>Выберите вопрос</option>
                {select.map(type => 
                    <option value={type}>{type}</option>
                )}
                </Form.Select>
            </Col>
        </Row>
    </div>
  
  )
}

export default Q7BarChart;

