import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = 'https://wmjaronslrkqxpkgqpbd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtamFyb25zbHJrcXhwa2dxcGJkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNTY3OTY0MiwiZXhwIjoyMDMxMjU1NjQyfQ.R-Zx1Y1cqvCWquZatUgyxbgh4QoOzc7dgwIQ_j1NCF0'
const supabase = createClient(supabaseUrl, supabaseKey);


 
async function getdata(name,num) {
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
// if(!name||!personid||!address||!dob||!license||!expiredate){
//     document.getElementById("message").innerHTML="<div>Error</div>";
//     return;
// }
// if(await setOwnerData(personid,name,address,dob,license,expiredate)==false) return;
// setVehicleData(reg,make,model,colour,personid);
// });
const output = document.getElementById("results");
const message = document.getElementById("message");
async function update(name, number){
    const persondata=await getdata(name,number);
    if(persondata[0]){
        for(let i=0; i<persondata.length; i++){
            if(i==0){
                output.innerHTML = "<div>"+"Name: "+persondata[i].Name + "<br>Address: "+persondata[i].Address + "<br>Date of Birth: "+persondata[i].DOB + "<br>License Number: "+persondata[i].LicenseNumber + "<br>Expiry Date: "+persondata[i].ExpiryDate + "<br><br>"+"</div>";
                message.innerHTML = '<div>Search successful</div>';
            }
            else
            output.innerHTML += "<div>"+"Name: "+persondata[i].Name + "<br>Address: "+persondata[i].Address + "<br>Date of Birth: "+persondata[i].DOB + "<br>License Number: "+persondata[i].LicenseNumber + "<br>Expiry Date: "+persondata[i].ExpiryDate + "<br><br>"+"</div>";
    }   
    }
    else message.innerHTML = "<div>No result found</div>";

}




document.getElementById("people-search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = document.getElementById("people-search-form")
    const myname=form.name.value;
    const mynum=form.license.value; 

    if(!myname && !mynum){
        message.innerHTML("<div>Error</div>")
        return false;
    }

    if(myname && mynum){ // Shouldnt have both
        message.innerHTML("<div>Error</div>")
        return false;
    }
    // update page
    update(myname,mynum);
});



