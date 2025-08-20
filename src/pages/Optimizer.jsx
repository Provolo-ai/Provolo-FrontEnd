import { useState } from "react";
import ResultsAccordion from "../Reusables/ResultsAccordion";
import TextInputField from "../Reusables/TextInputField";
import CustomButton from "../Reusables/CustomButton";
import CustomSnackbar from "../Reusables/CustomSnackbar";
import { validatePortfolioInput } from "../schemas/portfolioSchema";
import useAuthStore from "../stores/authStore";

const PortfolioOptimizer = () => {
  // Get user from auth store
  const user = useAuthStore((state) => state.user);
  
  // State variables for input data ==========>>>>>>>>>>>>
  const [freelancerName, setFreelancerName] = useState("");
  const [profileTitle, setProfileTitle] = useState("");
  const [profileDescription, setProfileDescription] = useState(""); // Renamed from profileText for clarity

  // State variables for output from the AI ==========>>>>>>>>>>>>
  const [analysisResults, setAnalysisResults] = useState(null);
  const [optimizedOverview, setOptimizedOverview] = useState("");
  const [projectSuggestions, setProjectSuggestions] = useState("");
  const [visualSuggestions, setVisualSuggestions] = useState("");
  const [beforeAfter, setBeforeAfter] = useState("");
  const [weaknessesSummary, setWeaknessesSummary] = useState("");

  // State for loading and error handling ==========>>>>>>>>>>>>
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Input Field STated for Ui Styling ==========>>>>>>>>>>>>
  const [touched, setTouched] = useState({
    name: false,
    title: false,
    description: false,
  });

  // Function to call the backend API ====================>>>>>>>>>>>>>>>>>>> START
  const analyzePortfolio = async () => {
    setIsLoading(true);
    setError("");
    setAnalysisResults(null);
    setOptimizedOverview("");
    setProjectSuggestions("");
    setVisualSuggestions("");
    setBeforeAfter("");
    setWeaknessesSummary("");

    try {
      // Validate input data with Zod
      const inputData = {
        freelancerName,
        profileTitle,
        profileDescription,
      };

      const inputValidation = validatePortfolioInput(inputData);
      if (!inputValidation.success) {
        const errorMessages = Object.values(inputValidation.errors)
          .flatMap((err) => err._errors || [])
          .join(", ");
        setError(errorMessages || "Please provide valid profile details");
        setIsLoading(false);
        return;
      }

      // Prepare request payload
      const requestPayload = {
        full_name: inputValidation.data.freelancerName,
        professional_title: inputValidation.data.profileTitle,
        profile: inputValidation.data.profileDescription
      };

      // Call backend API endpoint
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/optimize-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include session cookie for authentication
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Authentication required. Please log in again.");
        } else if (response.status === 429) {
          setError("You have reached your daily prompt limit. Please try again tomorrow.");
        } else {
          const errorData = await response.json().catch(() => ({}));
          setError(errorData.message || "Something went wrong. Please try again.");
        }
        setIsLoading(false);
        return;
      }

      const result = await response.json();
      console.log("result", result)
      // Set the analysis results from backend response
      setAnalysisResults(result.data.fullAnalysis || "Analysis completed successfully");
      setWeaknessesSummary(result.data.weaknessesAndOptimization || "N/A");
      setOptimizedOverview(result.data.optimizedProfileOverview || "N/A");
      setProjectSuggestions(result.data.suggestedProjectTitles || "N/A");
      setVisualSuggestions(result.data.recommendedVisuals || "N/A");
      setBeforeAfter(result.data.beforeAfterComparison || "N/A");
      // } else {
      //   setError(result.message || "The analysis returned an empty response.");
      // }
    } catch (err) {
      console.error("Error during analysis:", err);
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <div className="p-6 sm:p-10 max-w-4xl mx-auto w-full">
        <div>
          <h1 className="mb-3 text-gray-300">
            Welcome, {user?.displayName || user?.email?.split('@')[0] || 'User'}
          </h1>
          {/* Input Section ====================>>>>>>>>>>>>>>>>>>> START*/}
          <div className="mb-8 p-10 bg-white rounded-lg border border-gray-200">
            <h2 className="text-3xl font-medium mb-6">Let's Get to Know Your Portfolio</h2>

            {/* New Input Fields for NAME & PROFILE HEADER ====================>>>>>>>>>>>>>>>>>>> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TextInputField
                id="freelancerName"
                label="Full Name"
                placeholder="John Doe"
                value={freelancerName}
                onChange={(e) => setFreelancerName(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                touched={touched.name || error}
                required
              />
              {/* Profile Title / Header Input Fields */}
              <TextInputField
                id="profileTitle"
                label=" Professional Title"
                placeholder="Senior Full-Stack Developer | React & Node.js Expert"
                value={profileTitle}
                onChange={(e) => setProfileTitle(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
                touched={touched.title || error}
                required
              />
            </div>

            {/* Profle Description Input Fields ====================>>>>>>>>>>>>>>>>>>> */}
            <div className="mb-4">
              <label htmlFor="profileDescription" className="block text-sm mb-2 bg-g">
                About You (Profile Overview)
              </label>

              <textarea
                required
                id="profileDescription"
                className={`w-full p-3 border rounded-md transition duration-150 ease-in-out bg-gray-50 placeholder:text-sm ${
                  error || (touched.description && !profileDescription.trim())
                    ? "ring-1 ring-red-600/10 ring-inset focus:ring-red-500 bg-red-50 placeholder-red-700"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
                rows="8"
                placeholder="Paste your Upwork profile overview & summary of your services here..."
                value={profileDescription}
                onChange={(e) => setProfileDescription(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, description: true }))}
              ></textarea>

              {(error || (touched.description && !profileDescription.trim())) && <p className="text-xs text-red-700">Required</p>}
            </div>

            <CustomButton onClick={analyzePortfolio} isLoading={isLoading} className="btn-primary">
              {" "}
              Run Optimization{" "}
            </CustomButton>

            {error && <CustomSnackbar open={error} close={() => setError("")} snackbarColor={"danger"} snackbarMessage={error} />}
          </div>
          {!analysisResults &&
            <p className="text-center text-xs text-gray-300">Provolo.org</p>
          }

          {/* Input Section ====================>>>>>>>>>>>>>>>>>>> END*/}

          {/* Output Section ====================>>>>>>>>>>>>>>>>>>> START*/}
          {analysisResults && <CustomSnackbar open={analysisResults} snackbarColor={"success"} snackbarMessage={"Analysis Complete"} />}

          {analysisResults && (
            <ResultsAccordion
              sections={[
                { title: "Weaknesses and Optimization Ideas", content: weaknessesSummary },
                { title: "Optimized Profile Overview", content: optimizedOverview },
                { title: "Suggested Project Titles and Layouts", content: projectSuggestions },
                { title: "Recommended Visuals/Layout Hierarchies", content: visualSuggestions },
                { title: "Before and After Comparison", content: beforeAfter },
              ]}
            />
          )}

          {/* Output Section ====================>>>>>>>>>>>>>>>>>>> END*/}
        </div>
      </div>
    </div>
  );
};

export default PortfolioOptimizer;
