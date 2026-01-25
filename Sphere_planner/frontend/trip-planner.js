// Authentication check
window.addEventListener('load', () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        window.location.href = 'auth.html';
        return;
    }
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    window.location.href = 'auth.html';
});

// Decode JWT to get user email (simple base64 decode)
function getUserEmailFromToken() {
    const token = localStorage.getItem('access_token');
    if (!token) return null;
    
    try {
        const parts = token.split('.');
        const payload = JSON.parse(atob(parts[1]));
        return payload.email;
    } catch (e) {
        return null;
    }
}

// Display user email
const userEmail = getUserEmailFromToken();
if (userEmail) {
    document.getElementById('userEmail').textContent = `Welcome, ${userEmail}`;
}

const budgetSlider = document.getElementById('budget');
        const budgetAmount = document.getElementById('budgetAmount');
        const accomBudget = document.getElementById('accomBudget');
        const foodBudget = document.getElementById('foodBudget');
        const actBudget = document.getElementById('actBudget');
        const transBudget = document.getElementById('transBudget');
        const generateBtn = document.getElementById('generateBtn');
        const itineraryContent = document.getElementById('itineraryContent');
        const startDateInput = document.getElementById('startDate');

        const today = new Date().toISOString().split('T')[0];
        startDateInput.setAttribute('min', today);
        startDateInput.value = today;

        budgetSlider.addEventListener('input', (e) => {
            const budget = parseInt(e.target.value);
            budgetAmount.textContent = budget;
            
            // Calculate budget
            accomBudget.textContent = Math.round(budget * 0.40);
            foodBudget.textContent = Math.round(budget * 0.30);
            actBudget.textContent = Math.round(budget * 0.20);
            transBudget.textContent = Math.round(budget * 0.10);
        });

        generateBtn.addEventListener('click', generateItinerary);

        function generateItinerary() {
            const destination = document.getElementById('destination').value;
            const duration = parseInt(document.getElementById('duration').value);
            const startDate = document.getElementById('startDate').value;
            const budget = parseInt(budgetSlider.value);
            const interests = Array.from(document.getElementById('interests').selectedOptions).map(opt => opt.value);
            const preferences = document.getElementById('preferences').value;

            if (!destination || !duration || !startDate) {
                alert('Please fill in all required fields!');
                return;
            }

            itineraryContent.classList.add('active');
            itineraryContent.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Creating your personalized itinerary...</p>
                </div>
            `;

            //AI generation
            setTimeout(() => {
                const itinerary = createItinerary(destination, duration, startDate, budget, interests, preferences);
                displayItinerary(itinerary);
            }, 2000);
        }

        function createItinerary(destination, duration, startDate, budget, interests, preferences) {
            const dailyBudget = Math.round(budget / duration);
            const date = new Date(startDate);
            
            const activities = {
                culture: [
                    { name: 'Local Museum Visit', desc: 'Explore the rich cultural heritage', cost: 1200, time: '10:00 AM' },
                    { name: 'Art Gallery Tour', desc: 'Contemporary and classic art collections', cost: 800, time: '2:00 PM' },
                    { name: 'Cultural Center', desc: 'Interactive cultural experiences', cost: 1000, time: '11:00 AM' }
                ],
                food: [
                    { name: 'Street Food Tour', desc: 'Authentic local cuisine experience', cost: 1600, time: '12:00 PM' },
                    { name: 'Local Market Visit', desc: 'Fresh produce and local specialties', cost: 1200, time: '9:00 AM' },
                    { name: 'Cooking Class', desc: 'Learn to cook traditional dishes', cost: 2800, time: '3:00 PM' }
                ],
                nature: [
                    { name: 'City Park Walk', desc: 'Relaxing nature trails', cost: 0, time: '8:00 AM' },
                    { name: 'Botanical Gardens', desc: 'Diverse plant species and landscapes', cost: 650, time: '10:00 AM' },
                    { name: 'Scenic Viewpoint', desc: 'Panoramic city views', cost: 400, time: '5:00 PM' }
                ],
                adventure: [
                    { name: 'Bike Tour', desc: 'Explore the city on two wheels', cost: 2000, time: '9:00 AM' },
                    { name: 'Water Sports', desc: 'Kayaking or paddleboarding', cost: 2400, time: '1:00 PM' },
                    { name: 'Hiking Trail', desc: 'Moderate difficulty scenic hike', cost: 800, time: '7:00 AM' }
                ],
                nightlife: [
                    { name: 'Local Music Venue', desc: 'Live performances and local bands', cost: 1200, time: '8:00 PM' },
                    { name: 'Night Market', desc: 'Shopping and street food', cost: 1600, time: '7:00 PM' },
                    { name: 'Rooftop Bar', desc: 'Drinks with a view', cost: 2000, time: '9:00 PM' }
                ],
                history: [
                    { name: 'Historical Walking Tour', desc: 'Guided tour of historic sites', cost: 1450, time: '10:00 AM' },
                    { name: 'Ancient Monument', desc: 'UNESCO World Heritage Site', cost: 1600, time: '11:00 AM' },
                    { name: 'Heritage Building', desc: 'Architectural masterpiece', cost: 1000, time: '2:00 PM' }
                ],
                shopping: [
                    { name: 'Local Flea Market', desc: 'Vintage finds and souvenirs', cost: 800, time: '11:00 AM' },
                    { name: 'Artisan Quarter', desc: 'Handmade crafts and gifts', cost: 1200, time: '1:00 PM' },
                    { name: 'Shopping District', desc: 'Modern shops and boutiques', cost: 2000, time: '3:00 PM' }
                ],
                photography: [
                    { name: 'Sunrise Spot', desc: 'Perfect lighting for photos', cost: 0, time: '6:00 AM' },
                    { name: 'Instagram-worthy Cafe', desc: 'Aesthetic coffee and photos', cost: 1000, time: '10:00 AM' },
                    { name: 'Architecture Tour', desc: 'Photogenic buildings', cost: 1200, time: '2:00 PM' }
                ]
            };

            const days = [];
            for (let i = 0; i < duration; i++) {
                const currentDate = new Date(date);
                currentDate.setDate(currentDate.getDate() + i);
                
                const dayActivities = [];
                const selectedInterests = interests.length > 0 ? interests : ['culture', 'food', 'nature'];
                
                // Morning activity
                const morningInterest = selectedInterests[Math.floor(Math.random() * selectedInterests.length)];
                dayActivities.push(activities[morningInterest][Math.floor(Math.random() * activities[morningInterest].length)]);
                
                // Afternoon activity
                const afternoonInterest = selectedInterests[Math.floor(Math.random() * selectedInterests.length)];
                dayActivities.push(activities[afternoonInterest][Math.floor(Math.random() * activities[afternoonInterest].length)]);
                
                // Evening activity
                const eveningInterest = selectedInterests[Math.floor(Math.random() * selectedInterests.length)];
                dayActivities.push(activities[eveningInterest][Math.floor(Math.random() * activities[eveningInterest].length)]);

                days.push({
                    date: currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
                    activities: dayActivities
                });
            }

            const tips = [
                `Use student discount apps like UNiDAYS or StudentBeans for additional savings in ${destination}`,
                'Book accommodations with free breakfast to save on food costs',
                'Use public transportation or rent bikes instead of taxis',
                'Visit attractions during off-peak hours for potential discounts',
                'Pack snacks and a reusable water bottle to reduce daily expenses',
                'Look for free walking tours - tip your guide what you can afford',
                'Consider a city pass if visiting multiple paid attractions'
            ];

            return { days, tips: tips.slice(0, 5), destination, dailyBudget };
        }

        function displayItinerary(itinerary) {
            let html = `<div style="margin-bottom: 20px; text-align: center;">
                <h3 style="color: #667eea;">Trip to ${itinerary.destination}</h3>
                <p style="color: #666;">Estimated daily budget: ₹${itinerary.dailyBudget}</p>
            </div>`;

            itinerary.days.forEach((day, index) => {
                const totalDayCost = day.activities.reduce((sum, act) => sum + act.cost, 0);
                html += `
                    <div class="day-item">
                        <h3>Day ${index + 1} - ${day.date}</h3>
                        ${day.activities.map(activity => `
                            <div class="activity">
                                <div class="activity-info">
                                    <div class="activity-time">${activity.time}</div>
                                    <div class="activity-name">${activity.name}</div>
                                    <div class="activity-description">${activity.desc}</div>
                                </div>
                                <div class="activity-cost">₹${activity.cost}</div>
                            </div>
                        `).join('')}
                        <div style="text-align: right; margin-top: 10px; font-weight: bold; color: #667eea;">
                            Day Total: ₹${totalDayCost}
                        </div>
                    </div>
                `;
            });

            html += `<div class="tips-section">
                    <h4>💡 Money-Saving Tips for Students</h4>
                    ${itinerary.tips.map(tip => `<div class="tip-item">• ${tip}</div>`).join('')}
                </div>`;
            itineraryContent.innerHTML = html;
        }