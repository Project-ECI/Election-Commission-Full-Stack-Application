import Footer1 from "../../components/Footer1.jsx";
import Navbar1 from "../../components/Navbar1.jsx";

import image from "../../assets/images/image-for-loginpage.png"

export default function VoterGuide(){
    return(
        <div>
            <Navbar1></Navbar1>
             

                <div className="registration-container margin-10">

                    <div className="reg-left-container">
                        <h1 className="font-mont">Hello Dear Voter We Will Guide You How To Use WebPage </h1>
                    <p className="mt-4">
                    Becoming a better voter starts with being well-informed about the candidates, issues, and the electoral process. Take time to research the backgrounds, platforms, and policy proposals of each candidate. Utilize reliable sources such as official candidate websites, non-partisan organizations, and reputable news outlets. Understanding the key issues at stake in the election and how each candidate plans to address them is crucial. Additionally, attend local debates, town halls, and community meetings to hear directly from the candidates and engage in discussions with fellow voters. </p>

                    <p className="mt-4">
                    Beyond staying informed, actively participating in the voting process is essential. Ensure you are registered to vote and understand the logistics of voting in your area, including registration deadlines, polling locations, and early voting options. Encourage others in your community to vote and provide assistance if needed. Engage in conversations about the importance of voting and share credible information to help others become informed voters. By being proactive and engaged, you contribute to a more informed and participatory democracy.</p>    
                    
                    <p className="mt-4">
                    Town halls, and community meetings to hear directly from the candidates and engage in discussions with fellow voters. Actively participating in the voting process is essential. Ensure you are registered to vote and understand the logistics of voting in your area, including registration deadlines, polling locations, and early voting options. Encourage others in your community to vote and provide assistance if needed. Engage in conversations about the importance of voting and share credible information to help others become informed voters. By being proactive and engaged, you contribute to a more informed and participatory democracy.
                    </p>

                    
                    
                    <img src={image} className="img-fluid" width="320px" alt="" />

                    </div>

                    <div className="reg-right-container">
                        <h1 className="font-mont"> Voter's Guide</h1>
                        
                        
                    </div>
                </div>

                
           
           
           
            <Footer1></Footer1>


        </div>
    )
}