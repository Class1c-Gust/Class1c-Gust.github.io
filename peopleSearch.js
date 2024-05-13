import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = 'https://iiujqurolyotzbvlfwqt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpdWpxdXJvbHlvdHpidmxmd3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMzQ4MDAsImV4cCI6MjAyOTgxMDgwMH0.hAIUU1sEOjMHlDpp2bcvEL5UkdeoV-hn_FyF2nVptA8';
const supabase = createClient(supabaseUrl, supabaseKey);


 
async function fetchData(name,num) {

    if(!name){
        const { data, error } = await supabase
        .from('People')
        .select("*")
        .ilike('LicenseNumber','%'+num+'%');

        if (error) {
            console.error('Error Fetching Data:', error.message);
            return [];
        }
        return data;
    }

    else if(!num){
        const { data, error } = await supabase
        .from('People')
        .select("*")
        .ilike('Name','%'+name+'%');

        if (error) {
            console.error('Error Fetching Data:', error.message);
            return [];
        }
        return data;
    }
}

const out = document.getElementById("results");
const message = document.getElementById("message");
async function updatePage(dName, dLNum){
    const pData=await fetchData(dName,dLNum);
    if(pData[0]){
        for(let i=0; i<pData.length; i++){
            if(i==0){
                out.innerHTML = "<div>"+"Name: "+pData[i].Name + "<br>Address: "+pData[i].Address + "<br>Date of Birth: "+pData[i].DOB + "<br>License Number: "+pData[i].LicenseNumber + "<br>Expiry Date: "+pData[i].ExpiryDate + "<br><br>"+"</div>";
                message.innerHTML = '<div>Search successful</div>';
            }
            else
                out.innerHTML += "<div>"+"Name: "+pData[i].Name + "<br>Address: "+pData[i].Address + "<br>Date of Birth: "+pData[i].DOB + "<br>License Number: "+pData[i].LicenseNumber + "<br>Expiry Date: "+pData[i].ExpiryDate + "<br><br>"+"</div>";
    }   
    }
    else message.innerHTML = "<div>No result found</div>";

}




document.getElementById("peopleForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = document.getElementById("peopleForm")
    const dName=form.name.value;
    const dLNum=form.license.value; 

    if(!dName && !dLNum){
        message.innerHTML("<div>Error</div>")
        return false;
    }

    if(dName && dLNum){
        message.innerHTML("<div>Error</div>")
        return false;
    }

    updatePage(dName,dLNum);
});



