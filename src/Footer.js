import { useState } from 'react';

function Footer() {

   const [isActive, setActive] = useState('false');

   const handleToggle = () => {
      setActive(!isActive);
   }

   return (
      <footer onClick={handleToggle} className={isActive ? 'footer-hidden' : 'footer-shown'}>
         <p className='move'>***</p>
         <p className='my-name'>gs @ <a href="https://junocollege.com">juno college</a><sup> &copy;</sup></p>
         <p>photos from <a href="https://unsplash.com">unsplash</a></p>
         <p>alert from <a href="https://sweetalert2.github.io/">sweetalert2</a></p>
      </footer>
   )
}

export default Footer;