import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet,faThin, faQrcode, faHouse } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Navigation () {
  return (
    <>
        <div className="navbar-continer">
          <div className="nav-icon">
          <Link to="/dashboard">
            <FontAwesomeIcon className='fa-icon' icon={faHouse} />
            </Link>
          </div>
            <div className="nav-icon">
                <Link to="/wallet">
                    <FontAwesomeIcon className='fa-icon'  icon={faWallet} />

                
                </Link>
            <i class="fa-thin fa-qrcode"></i>
             </div>
            <div className='qrcode nav-icon'><Link to="">
            <FontAwesomeIcon className='fa-icon' icon={faQrcode} />
            </Link>

            </div>
            <div className="nav-icon">
                <Link to="/transaction-history">
                <img className='fa-icon' width="25" height="25" src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/external-transaction-finance-and-accounting-inkubators-detailed-outline-inkubators.png" alt="external-transaction-finance-and-accounting-inkubators-detailed-outline-inkubators"/>
                </Link>
            </div>
            <div className="nav-icon">
                <Link to="/category">
            <span class="material-symbols-outlined fa-icon">
category
</span>
</Link>
            </div>
        </div>
    </>
    );
};
export default Navigation;