import * as React from 'react';

export default ({ type="", text="", className="", placeholder ="", id="",  ...props }) => {
  console.log('sssssssss',props);
  return (
      <button className={`${className}`} placeholder={`${placeholder}`} id={id} type={props.type} {...props} onClick={props.onClick}>
          {props.children}

      </button>
  );
}