$(document).ready(function()
{
    createTeamCards();
});
function createTeamCards() {
    const teamContainer = document.getElementById("teamContainer");

    $.ajax({
        url:"contactus.json",
        cache:false,
        success:function(response)
        {
            debugger;
            var members=response.teammembers;
            $(members).each(function()
            {
                const memberDiv = document.createElement("div");
                
                const memberName = document.createElement("h3");
                memberName.innerText = this.name;

                const memberCaption = document.createElement("p");
                memberCaption.innerText = this.caption;

                const memberPhoto = document.createElement("img");
                memberPhoto.src = this.photo;
                

                memberDiv.appendChild(memberPhoto);
                memberDiv.appendChild(memberName);
                memberDiv.appendChild(memberCaption);

                teamContainer.appendChild(memberDiv);
            });
        }
    });
   
  
}


