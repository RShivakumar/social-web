import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
//components
import { ReplyForm } from "../forms";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);
  return (
    <a className="reply-btn" onClick={decoratedOnClick}>
      {children}
    </a>
  );
}

const ReplyAccordion = (props) => {
  return (
    <Accordion>
      <CustomToggle eventKey="0">Reply</CustomToggle>
      <Accordion.Collapse eventKey="0">
        <div className="replys-wrapper">
          <div className="reply-section">
            {props.data.replies.length > 0 &&
              props.data.replies.map((item) => {
                return (
                  <div key={item._id} className="comment-box mb-2">
                    <p className="reason mb-0">{item.text}</p>
                  </div>
                );
              })}
          </div>
          <div style={{ width: "100%", height: "50px" }}>
            <ReplyForm
              data={props.data}
              id={props.id}
              fetchposts={props.fetchposts}
            />
          </div>
        </div>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default ReplyAccordion;
