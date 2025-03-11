import React from "react";
import Background from "../../components/Background";
import logo from '../../assets/yatri-pay-logo-main.png'

const Page1 = () => {
  return (
    <Background>
      <div>
        <header>
            <div className="flex justify-start p-8">
                <img
                 src={logo} alt="logo" className="h-12"/>
            </div>
        </header>

        <main>
            <h1>Stacking</h1>

            <div>

                <div>
                    <div>LOCKED</div>
                    <div>PORTFOLIO</div>
                </div>

                <div>
                    <div>
                        <div>Total Subscribers</div>
                        <div>0000</div>
                    </div>
                    <div>
                    <div>Total Locked YTP</div>
                    <div>0000</div>
                    </div>
                </div>
            </div>


        </main>
      </div>
    </Background>
  );
};

export default Page1;
