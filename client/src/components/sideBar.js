import React, { useState } from "react";
import {Button, Nav} from "react-bootstrap";
import Collapsible from "./Collapsible";
import CreateRegion from './AddRegion';
import DeleteDistric from './DelDistrict';
import DeleteQuestion from './delModals';
import DeleteRegion from './DelRegion';
import ExcelExport from './excel';
import CreateQuestion from './modals';
import CreateQuestionnaire from "./AddQuestionnaire";
import DeleteQuestionnaire from "./DelQuestionnaire";


const Sidebar = () => {

    const [createQuesVisible, setCreateQuesvisible] = useState(false)
    const [createRegVisible, setCreateRegvisible] = useState(false)
    const [createVisible, setCreatevisible] = useState(false)
    const [deleteRegVisible, setDeleteRegvisible] = useState(false)
    const [deleteDisVisible, setDeleteDisvisible] = useState(false)
    const [deleteVisible, setDeletevisible] = useState(false)
    const [deleteQuesVisible, setDeleteQuesVisible] = useState(false)

    return (
        <Nav className="flex-column" style={{backgroundColor: "rgb(236, 240, 241)", height: "100%"}}>
            <Collapsible label="Анкеты >">
                <Button className="btn btn-light w-100" style={{color: 'black', borderRadius: "0"}} onClick={()=> setCreateQuesvisible(true)}>Создать Анкету</Button>
                <CreateQuestionnaire show={createQuesVisible} onHide={() => setCreateQuesvisible(false)} />
                <Button className="btn btn-light w-100" style={{color: 'black', borderRadius: "0"}} onClick={()=> setDeleteQuesVisible(true)}>Редактировать Анкету</Button>
                <DeleteQuestionnaire show={deleteQuesVisible} onHide={() => setDeleteQuesVisible(false)}/>
            </Collapsible>
            <Collapsible label="Область >">
                <Button className="btn btn-light w-100" style={{color: 'black', borderRadius: "0"}} onClick={()=> setCreateRegvisible(true)}>Создать область и округи</Button>
                <CreateRegion show={createRegVisible} onHide={() => setCreateRegvisible(false)}/>
                <Button className="btn btn-light w-100" style={{color: 'black', borderRadius: "0"}} onClick={()=> setDeleteRegvisible(true)}>Редактировать области</Button>
                <DeleteRegion show={deleteRegVisible} onHide={() => setDeleteRegvisible(false)}/>
                <Button className="btn btn-light w-100" style={{color: 'black', borderRadius: "0"}} onClick={()=> setDeleteDisvisible(true)}>Редактировать округи</Button>
                <DeleteDistric show={deleteDisVisible} onHide={() => setDeleteDisvisible(false)}/>
            </Collapsible>
            <Collapsible label="Вопросы >">
                    <Button className="btn btn-light w-100" style={{color: 'black', borderRadius: "0"}} onClick={()=> setCreatevisible(true)}>Создать вопрос с ответами</Button>
                    <CreateQuestion show={createVisible} onHide={() => setCreatevisible(false)}/>
                    <Button className="btn btn-light w-100" style={{color: 'black', borderRadius: "0", width: "auto"}}  onClick={()=> setDeletevisible(true)}>Удалить вопрос</Button>
                    <DeleteQuestion show={deleteVisible} onHide={() => setDeletevisible(false)}/>
            </Collapsible>
            <ExcelExport/>
        </Nav>
    );
  };


export default Sidebar
