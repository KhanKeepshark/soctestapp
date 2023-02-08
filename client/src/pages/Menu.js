import React, { useContext, useEffect, useState } from 'react';
import { Card, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Context } from '..';
import '../components/static/Main.css'
import { fetchQuestionnaire } from '../http/questionnaireAPI';



const Menu = () => {
    const {askData} = useContext(Context)
    const [questionnaire, setQuestionnaire] = useState([])

    useEffect(()=>{
        fetchQuestionnaire().then(data => setQuestionnaire(data))
      }, [])

    const setQuestionnaireId = (id) => {
        askData.setQuestionnaire(id)
    }

  return (
    <div>
        <div className='d-flex justify-content-center mt-4 h1'>
            Аналитическое агенство социальных процессов
        </div>
        <Container className='d-flex justify-content-center align-items-center mt-4 mob'>
            
            <div className='row'>
            {questionnaire.map(questionnaire =>
                <div className='col-md-6'>
                <Link style={{textDecoration: 'none', color: 'black'}} to='/regions' onClick={()=> setQuestionnaireId(questionnaire.id)}>
                    <Card className='m-3 cardHover' style={{ width: '18rem', height: '9rem' }}>
                        <Card.Body className='d-flex justify-content-center align-items-center h3'  align="center">
                       {questionnaire.name}
                        </Card.Body>
                    </Card>
                </Link>
                </div>
            )}
            </div>
            
        </Container>
    </div>

  );
}

export default Menu;