import * as React from 'react';

export default ({ className = "", id="", label = "", value="", type = "", src="",imgClassName="", placeholder = "", ...props }) => {
  // return (
  //     <input className={`${className}`} id={id} type={type} onClick={props.onClick} {...props}>
  //         {props.children}

  //     </input>
  // );
    const syntheticEvent = props.onChange || props.onClick || props.onBlur || props.onFocus || props.onKeyDown || props.onKeyPress || props.onKeyUp ;

    return (
      <>
        <input
            // id={`${id}`}
            className={`${className}`}
            type={`${type}`}
            ref={props.reference}
            checked={(props.checked === 'true' || props.checked === true) ? true : ((props.checked === 'false' || props.checked === false) ? false : null)}
            placeholder={`${placeholder}`}
            onChange={props.onChange}
            value={`${value}`}
            // error={props.error}/
            readOnly={syntheticEvent ? true : false}
            {...props}
        />
        <img src={`${src}`} className={`${imgClassName}`} />
</>    
    );


}

// export const Buttonicon = (props) => {
   
//   return (
//       <Button className={props.classButton} {...props}>
//                       <Icons className={props.classIcon} />
//       </Button>
//   );
// }