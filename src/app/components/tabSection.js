"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import DeleteIcon from "../images/delete.svg"
import "./tabSection.css";

export default function TabSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [weeks, setWeeks] = useState([[], [], [], []]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [loading, setLoading] = useState(true);



  const tabs = ["All Meals", "Week 1", "Week 2", "Week 3", "Week 4"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes");
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToWeek = () => {
    if (selectedWeek === null) {
      alert("Please select a week before saving!");
      return;
    }
  
    if (weeks[selectedWeek].some((meal) => meal.id === selectedRecipe.id)) {
      alert("This meal is already added to the selected week!");
      return;
    }
  
    const updatedWeeks = [...weeks];
    updatedWeeks[selectedWeek].push(selectedRecipe);
    setWeeks(updatedWeeks);
    setSelectedWeek(null);
    setSelectedRecipe(null);
    setIsModalOpen(false);
  };

  const removeMealFromWeek = (meal, weekIndex) => {
    const updatedWeeks = [...weeks];
    updatedWeeks[weekIndex] = updatedWeeks[weekIndex].filter((m) => m.id !== meal.id);
    setWeeks(updatedWeeks);
  };

  return (
    <>
      <section className="tab-Section py-6 ">
        <h3 className="sec-head px-56">Week Oders</h3>

        <div className="tabs-container">
          <div className="tabs-header my-5 px-56 py-5">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`tab-button ${activeTab === index ? "active" : ""}`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </button>
            ))}
            <button className={`add-to-week ${selectedRecipe ? "active" : "disabled"}`} onClick={() => setIsModalOpen(true)} disabled={!selectedRecipe} title={selectedRecipe ? "" : "Please Select Meal"}>
              Add to Week</button>
          </div>

          <div className="tabs-content">
            {activeTab === 0 && (
              <div className="tab-panel ">
                {recipes.length > 0 ? (
  recipes.map((meal, index) => (
     <div key={index} onClick={() => setSelectedRecipe(meal)}
                    className={`meal-card ${selectedRecipe?.id === meal.id ? "selected" : ""}`}>
                    <div className="card">
                      <div className="card-img">
                        <img src={meal.image} alt="Card-img" />
                        <span className="badge">Dinner</span>
                      </div>
                      <div className="card-content">
                        <h3 className="card-head">{meal.name}</h3>
                        <p className="card-description">
                          <strong>Instructions:</strong><br />
                          {meal.instructions.slice(0, 4).map((instruction, i) => (
                            <span key={i} className="instruction-text">
                              {i + 1}. {instruction}<br />
                            </span>
                          ))}
                        </p>
                        <div className="card-footer">
                          <p>
                            <strong>Cuisine:</strong> {meal.cuisine}
                          </p>
                          <p>
                            <strong>Rating:</strong> {meal.rating}
                            <span className="stars"> ★★★★</span>
                          </p>
                        </div>

                      </div>
                    </div>
                  </div>  ))
) : (
  <p>No meals available.</p>
)}
              </div>
            )}

            {activeTab >= 1 &&
              activeTab <= 4 && (
                <div className="tab-panel">

                  <div>
                    {weeks[activeTab - 1].length > 0 ? (
                      weeks[activeTab - 1].map((meal, index) => (
                        <div key={index} 
                          className="meal-card">
                          <div className="card">
                            <div className="card-img">
                              <img src={meal.image} alt="Card-img" />
                              <span className="badge">Dinner</span>
                              <span className="delete-badge" onClick={() => removeMealFromWeek(meal, index)}>
                                <Image src={DeleteIcon} width={50} height={50} alt="Delete Icon"  />
                              </span>
                            </div>
                            <div className="card-content">
                              <h3 className="card-head">{meal.name}</h3>
                              <p className="card-description">
                                <strong>Instructions:</strong><br />
                                {meal.instructions.slice(0, 4).map((instruction, i) => (
                                  <span key={i} className="instruction-text">
                                    {i + 1}. {instruction}<br />
                                  </span>
                                ))}
                              </p>
                              <div className="card-footer">
                                <p>
                                  <strong>Cuisine:</strong> {meal.cuisine}
                                </p>
                                <p>
                                  <strong>Rating:</strong> {meal.rating}
                                  <span className="stars"> ★★★★</span>
                                </p>
                              </div>

                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No meals added yet.</p>
                    )}
                  </div>
                </div>
              )}

          

            {isModalOpen && (
             <div className="modal-overlay">
             <div className="modal">
               <h2>Select Week</h2>
               <div className="week-buttons">
                 {["Week 1", "Week 2", "Week 3", "Week 4"].map((week, index) => (
                   <button
                     key={index}
                     className={`week-button ${selectedWeek === index ? "selected" : ""}`}
                     onClick={() => setSelectedWeek(index)}
                   >
                     {week}
                   </button>
                 ))}
               </div>
               <button
                 className="save-button"
                 onClick={handleAddToWeek}
                 disabled={selectedWeek === null || !selectedRecipe}
               >
                 Save
               </button>
               <button className="close-modal" onClick={() => setIsModalOpen(false)}>
                 X
               </button>
             </div>
           </div>
            )}


          </div>
        </div>

      </section>
    </>
  );
}
