import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = 'https://wmjaronslrkqxpkgqpbd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtamFyb25zbHJrcXhwa2dxcGJkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNTY3OTY0MiwiZXhwIjoyMDMxMjU1NjQyfQ.R-Zx1Y1cqvCWquZatUgyxbgh4QoOzc7dgwIQ_j1NCF0'
const supabase = createClient(supabaseUrl, supabaseKey);


 
async function getVehicleData(reg) {

    const { data, error } = await supabase
    .from('Vehicles')
    .select('*, People(Name,LicenseNumber,PersonID)')
    .ilike('VehicleID','%'+reg+'%');

    if (error) {
        console.error(error.message);
        return [];
    }

    for(let i=0; i<data.length;i++){
        // console.log(data[i].Make)
        if(!data[i].Make) data[i].Make="N/A";
        if(!data[i].Model) data[i].Make="N/A";
        if(!data[i].Colour) data[i].Make="N/A";
    }

    // for(let int i=1; i<data.length+1;i++){
    //     // console.log(data[i].Make)
            // if (!error)
    //     if(!data[i].Make) data[i].Make="N/A";
    //     if(!data[i].Model) data[i].Make="N/A";
    //     if(!data[i].Colour) data[i].Make="N/A";
    // }

    return data;
}

// set output
const output = document.getElementById("results");

async function update(reg){
    const carData=await getVehicleData(reg);
    if(carData[0]){
        for(let i=0; i<carData.length; i++){
            if(i==0){
                if(!carData[i].OwnerID){  
                    output.innerHTML = "<div>"+"Make: "+carData[i].Make + "<br>Model: "+carData[i].Model + "<br>Colour: "+carData[i].Colour + "<br>Owner's Name: N/A" + "<br>Owner's License Number: N/A" + "<br><br>"+"</div>";
                    message.innerHTML = '<div>Search successful</div>';
                }
                else {
                    output.innerHTML = "<div>"+"Make: "+carData[i].Make + "<br>Model: "+carData[i].Model + "<br>Colour: "+carData[i].Colour + "<br>Owner's Name: "+carData[0].People.Name + "<br>Owner's License Number: "+carData[0].People.LicenseNumber + "<br><br>"+"</div>";
                    message.innerHTML = '<div>Search successful</div>';
                }
            }
            else
            if(!carData[i].OwnerID){  
                output.innerHTML += "<div>"+"Make: "+carData[i].Make + "<br>Model: "+carData[i].Model + "<br>Colour: "+carData[i].Colour + "<br>Owner's Name: N/A" + "<br>Owner's License Number: N/A" + "<br><br>"+"</div>";
            }
            else{
                output.innerHTML += "<div>"+"Make: "+carData[i].Make + "<br>Model: "+carData[i].Model + "<br>Colour: "+carData[i].Colour + "<br>Owner's Name: "+carData[i].People.Name + "<br>Owner's License Number: "+carData[i].People.LicenseNumber + "<br><br>"+"</div>";
            }
        }
    }
    else message.innerHTML = "<div>No result found</div>";
    

}




document.getElementById("vehicleSearchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = document.getElementById("vehicleSearchForm")
    const reg=form.rego.value;
    if(!reg){
        message.innerHTML("<div>Error</div>")
        return false;
    }

    update(reg);
});



