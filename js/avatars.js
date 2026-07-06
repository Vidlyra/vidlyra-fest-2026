// =======================================
// Frequency Avatars
// Vidlyra Fest 2026
// =======================================

// Avatar List
const avatars = [

    // ======================
    // BASIC
    // ======================

    {
        id:1,
        name:"Student Hero",
        membership:"Basic",
        image:"images/avatars/basic/student-hero.png"
    },

    {
        id:2,
        name:"Cyber Rookie",
        membership:"Basic",
        image:"images/avatars/basic/cyber-rookie.png"
    },

    {
        id:3,
        name:"Young Samurai",
        membership:"Basic",
        image:"images/avatars/basic/young-samurai.png"
    },

    {
        id:4,
        name:"Music Producer",
        membership:"Basic",
        image:"images/avatars/basic/music-producer.png"
    },

    {
        id:5,
        name:"Anime Idol",
        membership:"Basic",
        image:"images/avatars/basic/anime-idol.png"
    },

    {
        id:6,
        name:"Shadow Ninja",
        membership:"Basic",
        image:"images/avatars/basic/shadow-ninja.png"
    },

    // ======================
    // PREMIUM
    // ======================

    {
        id:101,
        name:"Neon Samurai",
        membership:"Premium",
        image:"images/avatars/premium/neon-samurai.png"
    },

    {
        id:102,
        name:"Cyber Assassin",
        membership:"Premium",
        image:"images/avatars/premium/cyber-assassin.png"
    },

    {
        id:103,
        name:"Arc Mage",
        membership:"Premium",
        image:"images/avatars/premium/arc-mage.png"
    },

    // ======================
    // VIP
    // ======================

    {
        id:201,
        name:"Dragon Guardian",
        membership:"VIP",
        image:"images/avatars/vip/dragon-guardian.png"
    },

    {
        id:202,
        name:"Void Emperor",
        membership:"VIP",
        image:"images/avatars/vip/void-emperor.png"
    }

];

// =======================================
// Load Gallery
// =======================================

async function loadAvatars(){

    const {

        data:{user}

    } = await window.sb.auth.getUser();

    if(!user){

        location.href="login.html";

        return;

    }

    // Get user's pass
    const {data:pass}=await window.sb
    .from("passes")
    .select("pass_type")
    .eq("user_id",user.id)
    .maybeSingle();

    const userPass=pass ? pass.pass_type : "None";

    const grid=document.getElementById("avatarGrid");

    grid.innerHTML="";

    avatars.forEach(avatar=>{

        let unlocked=false;

        if(avatar.membership==="Basic")
            unlocked=true;

        if(avatar.membership==="Premium" &&
           (userPass==="Premium" || userPass==="VIP"))
            unlocked=true;

        if(avatar.membership==="VIP" &&
           userPass==="VIP")
            unlocked=true;

        grid.innerHTML+=`

        <div class="avatar">

            <img src="${avatar.image}">

            <h3>${avatar.name}</h3>

            <p>${avatar.membership}</p>

            ${
                unlocked ?

                `<button onclick="selectAvatar(${avatar.id})">

                Select

                </button>`

                :

                `<button disabled>

                🔒 Locked

                </button>`

            }

        </div>

        `;

    });

}

// =======================================
// Save Avatar
// =======================================

async function selectAvatar(id){

    const {

        data:{user}

    }=await window.sb.auth.getUser();

    await window.sb

    .from("profiles")

    .update({

        selected_avatar:id

    })

    .eq("user_id",user.id);

    alert("✅ Avatar Selected!");

    location.href="dashboard.html";

}

loadAvatars();
