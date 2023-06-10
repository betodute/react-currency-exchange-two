import './App.css'

export const Footer = (props) => {
  return (
    <div className='footer-wrapper row'> 
      <div className='col-12'>
        <p> @betodute </p>
        <a> <i className="fa-brands fa-github fa-2xl"></i> </a> 
        <a> <i className="fa-brands fa-linkedin fa-2xl"></i> </a>
      </div>
      <div className='col-12'>
        <p> special thanks to altcademy </p>
      </div>
    </div>
    )
}