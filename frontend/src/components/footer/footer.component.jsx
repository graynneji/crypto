import './footer.style.css';


const Footer =()=>{
    const date = new Date();
    const currentYear = date.getUTCFullYear();
  
    return (

        <><div className='footer'>&copy; 2018 - {currentYear} G-X Trade<span>Cookie Preferences</span></div></>
    )
}
export default Footer