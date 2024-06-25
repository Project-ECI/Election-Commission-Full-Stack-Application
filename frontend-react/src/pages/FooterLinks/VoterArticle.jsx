import Footer1 from "../../components/Footer1.jsx";
import Navbar1 from "../../components/Navbar1.jsx";



import image from "../../assets/images/image-for-loginpage.png"
export default function VoterGuide(){
    return(
        <div>
            <Navbar1></Navbar1>
             

                <div className="registration-container margin-10">

                    <div className="reg-left-container">
                        <h1 className="font-mont">Hello Dear Voter </h1>
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
                        <h1 className="font-mont"> Become A Better Votter</h1>
                        
                        <p >
                       
                            <h3>
                            1. Introduction to Voting  : 
                            </h3>
                            <p className="mb-2">
                            <h5>
                            Why Voting Matters : </h5> Explain the importance of voting in shaping policies and electing representatives who reflect the community's values.
                            Outline the eligibility criteria for voters, including age, citizenship, and registration requirements.
                            
                            </p>

                            
                           <p className="mb-2">
                            <h3>
                            2. How to Register to Vote :
                            </h3>

                            <p className="mb-2">
                            <h5>
                            Registration Process:</h5> Step-by-step instructions on how to register to vote, including online, by mail, and in-person options.
                            Deadlines: Important dates and deadlines for voter registration.
Verification: How to check if you are registered and your registration status.

                            </p>

                                


                           </p >
                            <p className="mb-2">
                                <h3>3. Types of Elections :</h3>
                                
                                </p>
                               <h5> Local Elections:</h5> Importance and impact of local elections (mayor, city council, school board, etc.).
State Elections: Overview of state elections (governor, state legislature, etc.).
Federal Elections: Information on federal elections (president, Congress, Senate).
                            
                            
                            </p>

                            <p className="mb-2">
                                <h3>5. Voting Methods</h3>
                            <p className="mb-2">
                            <h5>
                            In-Person Voting:   
                            </h5>
                            Information on polling locations, what to bring, and what to expect at the polling place.
Early Voting: Details on early voting options, including locations and dates.
Mail-In Voting: How to request, fill out, and return an absentee or mail-in ballot.
                            </p>

                            <p className="mb-2">
                                <h3>6. Understanding Results: </h3>
                            </p>
                            <p className="mb-2">
                            <h5>
                            What to Expect:</h5> Walkthrough of what happens on Election Day, including finding your polling place and what identification is required.
                            Information on accommodations for voters with disabilities.
                            </p>

                            <p className="mb-2">
                                <h3>7. Post-Election</h3>
                            </p>
                            <p className="mb-2"> 
                            <h5>
                            Understanding Results:</h5> How and when election results are reported and what to expect if results are contested.
                            Staying Engaged: Ways to stay engaged in civic activities beyond voting, such as attending town hall meetings and participating in local government.
                            </p>
                           



                        </p>
                    </div>
                </div>

                
           
           
           
            <Footer1></Footer1>


        </div>
    )
}