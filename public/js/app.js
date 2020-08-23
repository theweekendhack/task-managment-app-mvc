const taskDashBoardContent = ()=>{

    const container = document.querySelector("#task-list-bottom-area");

    container.addEventListener("click",(e)=>{


        const element = e.target;

        console.log(element)

        if(element.tagName == "A" && element.innerHTML.includes("Remove"))
        {
            
            const answer = confirm("You are about to delete a task")

            if(answer)
            {
                location.href=`/task/delete/${element.id}?method=delete`
            }
    
            
          e.preventDefault();
        }


    })
}


const main = ()=>
{

    let showHambugerMenu=false;

    const pageID = document.querySelector("#task-dashboard")

    const hambugerIcon = document.querySelector(".hambuger-menu");
    const menuLinks = document.querySelector("#main-menu-links")
    hambugerIcon.addEventListener("click",()=>{

        if(showHambugerMenu)
        {
            menuLinks.style.display="none";
            showHambugerMenu=false;
        }

        else
        {
            menuLinks.style.display="block";
            showHambugerMenu=true;


        }
       
    });


    if(pageID)
    {
        taskDashBoardContent();
    }


}

main();



 