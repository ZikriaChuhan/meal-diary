"use client";
import { useState, useEffect } from "react";
import "./tabSection.css";

export default function TabSection() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = ["All Meals", "Week 1", "Week 2", "Week 3", "Week 4"];

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
  
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

    return (
        <>
        <section className="tab-Section py-6 ">
            <h3 className="px-56">Week Oders</h3>

            <div className="tabs-container">
      {/* Tabs Navigation */}
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
        <button className="add-to-week">Add to Week</button>
      </div>

      {/* Tabs Content */}
      <div className="tabs-content">
        {activeTab === 0 && (
          <div className="tab-panel">
            <div>
                <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg" alt="Card-img" />
                </div>
                <h3>Classic Margherita Pizza</h3>
                <p>Preheat the oven to 475°F (245°C). Roll out the pizza dough and spread tomato sauce evenly. Top with slices of fresh mozzarella and fresh basil leaves.</p>
            </div>


            <div className="card">
      <div className="card-image">
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg" alt="Card-img" />
        <span className="badge">Dinner</span>
      </div>
      <div className="card-content">
        <h3 className="card-title">Classic Margherita Pizza</h3>
        <p className="card-description">{description}</p>
        <div className="card-footer">
          <p>
            <strong>Cuisine:</strong> {cuisine}
          </p>
          <p>
            <strong>Rating:</strong> {rating}{" "}
            <span className="stars">★★★★★</span>
          </p>
        </div>
      </div>
    </div>


          </div>
        )}
        {activeTab === 1 && (
          <div className="tab-panel">
            <h3>Week 1</h3>
            <p>Meals for week 1...</p>
          </div>
        )}
        {activeTab === 2 && (
          <div className="tab-panel">
            <h3>Week 2</h3>
            <p>Meals for week 2...</p>
          </div>
        )}
        {activeTab === 3 && (
          <div className="tab-panel">
            <h3>Week 3</h3>
            <p>Meals for week 3...</p>
          </div>
        )}
        {activeTab === 4 && (
          <div className="tab-panel">
            <h3>Week 4</h3>
            <p>Meals for week 4...</p>
          </div>
        )}
      </div>
    </div>

        </section>
        </>
    );
}