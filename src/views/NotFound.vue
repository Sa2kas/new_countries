<template>
    <div class="notFound">
        <div class="error">
            Klaida 404
        </div>
        <div class="title">
            Puslapis nerastas
        </div>
        <div class="link">
            Eiti į 
            <router-link to="/">pagrindinį </router-link>
            puslapį 
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.notFound {
    padding: 60px min(376px, 19.58vw) 50px min(359px, 18.698vw);
}
.error {
    padding-bottom: 20px;
    font-size: 44px;
    font-weight: normal;
    letter-spacing: 0.01em;
    font-family: "Oswald";
}
.title {
    padding-bottom: 20px;
    font-size: 30px;
    font-weight: normal;
    letter-spacing: 0.03em;
    font-family: "Oswald";
}
.link {
    padding-bottom: 20px;
    font-size: 20px;
    font-weight: 200;
    letter-spacing: 0.02em;
    font-family: "Oswald";
}
a {
    text-transform: uppercase;
    color: #0053a6;
}
</style>