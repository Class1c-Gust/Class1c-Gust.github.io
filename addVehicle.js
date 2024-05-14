import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = 'https://wmjaronslrkqxpkgqpbd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtamFyb25zbHJrcXhwa2dxcGJkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNTY3OTY0MiwiZXhwIjoyMDMxMjU1NjQyfQ.R-Zx1Y1cqvCWquZatUgyxbgh4QoOzc7dgwIQ_j1NCF0'
const supabase = createClient(supabaseUrl, supabaseKey);



async function searchOwner(name){
    const { data, error } = await supabase
    .from('People')
    .select("*")
    .ilike('Name','%'+name+'%');
    // check name is similar
    if (error) {
        console.error('Error:', error.message);
        document.getElementById("message").innerHTML="<div>Error</div>";
        return [];
    }
    return data;
}



async function setOwnerData(personid,name,address,iDOB,lNum,expiryDate){
    const { error } = await supabase
    .from('People')
    .insert([{PersonID: Number(personid), Name: String(name), Address: String(address), DOB: String(iDOB), LicenseNumber: String(lNum), ExpiryDate: String(expiryDate)}]);
    // insert to set the data in supabase
    
    if (error) {
        console.error('Error:', error.message);
        document.getElementById("message").innerHTML="<div>Error</div>";
        return false;
    }



    return true;
}

async function setVehicleData(reg,make,model,colour,id){
    const { error } = await supabase
    .from('Vehicles')
    .insert([{VehicleID: String(reg), Make: String(make), Model: String(model), Colour: String(colour), OwnerID: Number(id)}]);
    if (error) {
        document.getElementById("message").innerHTML="<div>Error</div>";
        console.error('Error:', error.message);
        return 1;
    }
    document.getElementById("message").innerHTML="<div>Vehicle added successfully</div>";
    return 0;
}

// UPDATE THE PAGE CONTENTS

async function update(reg,make,model,colour,owner){
    const owner = await searchOwner(owner);
    if(owner[0])
    // owner[0].personID
        await setVehicleData(reg,make,model,colour,owner[0].PersonID);
    else {        
        var output = document.getElementById("results");
        // ADDING IN THE FORM IF NEW OWNER
        output.innerHTML = "<form method='post' id='addOwnerForm'>New owner! enter details here<br><label for='personid'>Owner ID </label><br> <input type='text' id='personid' name='personid'><br><label for='name'>Owner Name </label><br><input type='text' id='name' name='name'><br><label for='address'>Owner Address </label><br> <input type='text' id='address' name='address'><br><label for='dob'>Date Of Birth </label><br> <input type='text' id='dob' name='dob'><br><label for='license'>Driving license number </label><br><input type='text' id='license' name='license'><br><label for='expire'>Expiry Date </label><br> <input type='text' id='expire' name='expire'><br><input type='submit' id='submit' value='Add owner'></button><br><br></form>";
        document.getElementById("addOwnerForm").addEventListener("submit", async (event) => {
            event.preventDefault();
            const form = document.getElementById("addOwnerForm");
            const personid=form.personid.value;
            const name=form.name.value;
            const address=form.address.value;
            const dob=form.dob.value;
            const license=form.license.value;
            const expiredate=form.expire.value;
            output.innerHTML = "Data has been submitted";
        
            if(!name||!personid||!address||!dob||!license||!expiredate){
                document.getElementById("message").innerHTML="<div>Error</div>";
                return;
            }
            if(await setOwnerData(personid,name,address,dob,license,expiredate)==false) return;
            setVehicleData(reg,make,model,colour,personid);
        });
    }
    
}



document.getElementById("addVehicleForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = document.getElementById("addVehicleForm")
    const reg=form.rego.value;
    const make=form.make.value;
    const model=form.model.value;
    const colour=form.colour.value;
    const name=form.owner.value;

    if(!reg||!make||!model||!colour||!name){
        document.getElementById("message").innerHTML="<div>Error</div>";
        return;
    }

    update(reg,make,model,colour,name);
});