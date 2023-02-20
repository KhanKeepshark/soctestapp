import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { fetchQuestions } from '../http/questionAPI';
import { fetchUserChoice } from '../http/userChoiceAPI';
import { fetchUsers } from '../http/userAPI';


const ExcelExport = () => {
    const [user, setUser] = useState([])
    const [questions, setQuestions] = useState([])
    const [userchoices, setUserChoices] = useState([])

    useEffect(()=>{
        fetchUserChoice().then(data => setUserChoices(data))
        fetchQuestions().then(data => setQuestions(data))
        fetchUsers().then(data => setUser(data.map(role => role.role != "ADMIN" ? role : "")))
    }, [])

    const q7questions = user.map(u => userchoices.map(i=> i.order == 1 && i.userId == u.id ? i.questionChoice : null)
    .filter(i => i != null)
    ).flat()

    const firstLine = [['Логин']
    .concat(questions.map(e => e.description)).concat(['']).concat([...new Set(q7questions)])]

    let csvData = firstLine.concat(user.filter(i => i != "").map(u => [u.email].concat(questions.map(e => userchoices.map(i => i.userId == u.id && i.questionChoice == e.description ? i.answerChoice : null)
    .filter(i => i != null)
    ).concat(' ')
    .concat(userchoices.map(i=> i.order == 1 && i.userId == u.id ? i.answerChoice : null)
    .filter(i => i != null))
    )))

    console.log(csvData)

    

return (
    <div className='d-flex flex-column'>
        <CSVLink  data={csvData} style={{color: 'black', borderRadius: "0"}} className="btn btn-outline-secondary" filename='Данные сервера.csv'>Скачать данные</CSVLink>
    </div>

  );
}

export default ExcelExport;