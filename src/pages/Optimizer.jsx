import React, { useState } from 'react'
import PortfolioPrompt from '../PortfolioPrompt';
import ResultsAccordion from '../Reusables/ResultsAccordion';
import TextInputField from '../Reusables/TextInputField';
import CustomButton from '../Reusables/CustomButton';
import CustomSnackbar from '../Reusables/CustomSnackbar';
import { BriefcaseBusiness, User } from 'lucide-react';

const PortfolioOptimizer = () => {

    // State variables for input data ==========>>>>>>>>>>
    const [freelancerName, setFreelancerName] = useState('');
    const [profileTitle, setProfileTitle] = useState('');
    const [profileDescription, setProfileDescription] = useState(''); // Renamed from profileText for clarity

    const [fileContent, setFileContent] = useState('');

    // State variables for output from the AI ==========>>>>>>>>>>
    const [analysisResults, setAnalysisResults] = useState(null);
    const [optimizedOverview, setOptimizedOverview] = useState('');
    const [projectSuggestions, setProjectSuggestions] = useState('');
    const [visualSuggestions, setVisualSuggestions] = useState('');
    const [beforeAfter, setBeforeAfter] = useState('');
    const [weaknessesSummary, setWeaknessesSummary] = useState('');

    // State for loading and error handling ==========>>>>>>>>>>
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Input Field STated for Ui Styling ==========>>>>>>>>>>
    const [touched, setTouched] = useState({
        name: false,
        title: false,
        description: false
    });


    // Function to call the AI model GEMINI ====================>>>>>>>>>>>>>>>>>>> START
    const analyzePortfolio = async () => {
        setIsLoading(true);
        setError('');
        setAnalysisResults(null);
        setOptimizedOverview('');
        setProjectSuggestions('');
        setVisualSuggestions('');
        setBeforeAfter('');
        setWeaknessesSummary('');

        let inputContent = '';

        try {
            if (
                !freelancerName || !profileTitle || !profileDescription // If any of the input field(s) is empty... error
            ) {
                setError("Please provide profile details");
                setIsLoading(false);
                return;
            } else {
                // Construct the input content from all the input fields
                inputContent = `
Freelancer Name: ${freelancerName}
Title: ${profileTitle}

Profile Description:
${profileDescription}
        `.trim();
            }

            // 🔮 Generate prompt using your custom logic ====================>>>>>>>>>>>>>>>>>>> 
            const prompt = PortfolioPrompt(inputContent);

            // 🧠 Prepare Gemini API call from PortfolioPrompt.js ====================>>>>>>>>>>>>>>>>>>> 
            let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiKey = import.meta.env.VITE_GOOGLE_AI_STUDIO; //.emv
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (
                result.candidates?.length > 0 &&
                result.candidates[0].content?.parts?.length > 0
            ) {
                const aiText = result.candidates[0].content.parts[0].text;
                setAnalysisResults(aiText);
                parseAndSetResults(aiText);
            } else {
                setError("The AI returned an empty or malformed response.");
            }
        } catch (err) {
            console.error("Error during analysis:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const parseAndSetResults = (fullText) => {
        const sectionHeadings = [
            { label: '1. Weaknesses and Optimization Ideas', setter: setWeaknessesSummary },
            { label: '2. Optimized Profile Overview', setter: setOptimizedOverview },
            { label: '3. Suggested Project Titles and Layouts', setter: setProjectSuggestions },
            { label: '4. Recommended Visuals/Layout Hierarchies', setter: setVisualSuggestions },
            { label: '5. Before and After Comparison', setter: setBeforeAfter }
        ];

        sectionHeadings.forEach((section, index) => {
            const startPattern = new RegExp(`${section.label}[\\s\\S]*?(?=\\n*\\s*\\d\\.|\\Z)`, 'i');
            const match = fullText.match(startPattern);

            if (match && match[0]) {
                const content = match[0].replace(new RegExp(`^${section.label}\\s*`, 'i'), '').trim();
                section.setter(content);
            } else {
                section.setter('N/A');
            }
        });
    };


    return (
        <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="p-6 sm:p-10 max-w-4xl mx-auto w-full">

                <div>
                    {/* <div>
                        <h1 className="text-4xl sm:text-5xl font-semibold text-center mb-2 mt-10 text-">
                            Upwork Optimizer
                        </h1>
                        <p className="text-center mb-10 text-gray-600">
                            Input your portfolio details, let our AI agent provide tailored recommendations for optimization.
                        </p>
                    </div> */}

                    {/* Input Section ====================>>>>>>>>>>>>>>>>>>> START*/}
                    <div className="mb-8 p-10 bg-white rounded-lg border border-gray-200">
                        <h2 className="text-3xl font-bold mb-6">Provide Your Portfolio Data</h2>
                        {/* <p className="mb-10 text-gray-600 text-xs">
                                Input your portfolio details, let our AI agent provide tailored recommendations for optimization.
                            </p> */}


                        {/* New Input Fields for NAME & PROFILE HEADER ====================>>>>>>>>>>>>>>>>>>> */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <TextInputField
                                id="freelancerName"
                                label="Full Name:"
                                placeholder="John Doe"
                                value={freelancerName}
                                iconStart={<User size={20} />}
                                onChange={(e) => setFreelancerName(e.target.value)}
                                onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                                touched={touched.name || error}
                                required
                            />
                            {/* Profile Title / Header Input Fields */}
                            <TextInputField
                                id="profileTitle"
                                label=" Professional Title/Headline:"
                                placeholder="Senior Full-Stack Developer | React & Node.js Expert"
                                value={profileTitle}
                                iconStart={<BriefcaseBusiness size={20} />}
                                onChange={(e) => setProfileTitle(e.target.value)}
                                onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
                                touched={touched.title || error}
                                required
                            />
                        </div>

                        {/* Profle Description Input Fields ====================>>>>>>>>>>>>>>>>>>> */}
                        <div className="mb-4">

                            <label htmlFor="profileDescription" className="block text-sm font-medium text-gray-700 mb-2 bg-g">
                                Profile Description / Overview:
                            </label>

                            <textarea
                                required
                                id="profileDescription"
                                className={`w-full p-3 border rounded-md transition duration-150 ease-in-out bg-gray-50 ${(error || (touched.description && !profileDescription.trim()))
                                    ? 'ring-1 ring-red-600/10 ring-inset focus:ring-red-500 bg-red-50 placeholder-red-700'
                                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                    }`}
                                rows="8"
                                placeholder="Paste your Upwork profile overview & summary of your services here..."
                                value={profileDescription}
                                onChange={(e) => setProfileDescription(e.target.value)}
                                onBlur={() => setTouched(prev => ({ ...prev, description: true }))}
                            ></textarea>

                            {(error || (touched.description && !profileDescription.trim())) &&
                                (<p className='text-xs text-red-700'>Required</p>)}

                        </div>

                        <CustomButton onClick={analyzePortfolio} isLoading={isLoading} className="btn-primary" > Optimize My Portfolio </CustomButton>

                        {error &&
                            <CustomSnackbar
                                open={error}
                                close={() => setError('')}
                                snackbarColor={"danger"}
                                snackbarMessage={error}
                            />
                        }
                    </div>
                    {/* Input Section ====================>>>>>>>>>>>>>>>>>>> END*/}


                    {/* Output Section ====================>>>>>>>>>>>>>>>>>>> START*/}
                    {analysisResults &&
                        <CustomSnackbar
                            open={analysisResults}
                            snackbarColor={"success"}
                            snackbarMessage={"Analysis Complete"}
                        />
                    }


                    {analysisResults && (
                        <ResultsAccordion
                            sections={[
                                { title: 'Weaknesses and Optimization Ideas', content: weaknessesSummary, },
                                { title: 'Optimized Profile Overview', content: optimizedOverview, },
                                { title: 'Suggested Project Titles and Layouts', content: projectSuggestions, },
                                { title: 'Recommended Visuals/Layout Hierarchies', content: visualSuggestions, },
                                { title: 'Before and After Comparison', content: beforeAfter, },
                            ]}
                        />
                    )}

                    {/* Output Section ====================>>>>>>>>>>>>>>>>>>> END*/}

                </div>
            </div>
        </div>
    )
}

export default PortfolioOptimizer
