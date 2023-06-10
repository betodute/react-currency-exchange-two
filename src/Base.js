import './App.css'

export const Base = (props) => {
  // fetch currency and add to state via hooks
  // then render state in return div
  // default u.s. dollar 
  return (
    <div className='base-wrapper bg-success-subtle rounded-pill'>
      <div className='base-headline'> Base Currency: <strong> 1 USD </strong> </div>
    </div>
    )
}