import React, { useState, useRef } from "react";
import { Nav } from "react-bootstrap";
import "./static/Main.css"

function Collapsible(props) {
    const [isOpen, setIsOpen] = useState(false)
    const parentRef = useRef()

    return (
        <div className="collapsible">
            <Nav.Link className="btn btn-outline-secondary toggle" 
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: 'black', borderRadius: "0"}}>{props.label}
            </Nav.Link>
            <div ref={parentRef} className="content"
            style={isOpen? {height: parentRef.current.scrollHeight + "px"} :
            {height: "0px"}}
            >
            <div >{props.children}</div>
            </div>
        </div>
    )
}

export default Collapsible