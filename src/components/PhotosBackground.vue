<template>
    <div id="photos-background">
        <div class="phone" v-for="membre of randomMembers" :key="membre.id">
            <div class="screen">
                <div class="encoche"></div>
                <img src="/img/tinder.svg" alt="tinder" class="logo" />
                <div class="photo" :style="{ backgroundImage: 'url(' + membre.photo + ')' }">
                    <div class="description">
                        <span class="name">
                            {{ membre.name }},
                            <span class="age">
                                &nbsp;{{ membre.age }}
                            </span>
                            <img src="/img/check.svg" alt="verified" class="verified" />
                        </span>
                        <img src="/img/info.svg" alt="info" class="info" />
                    </div>
                </div>
                <div class="buttons">
                    <img v-for="icon of ['reload', 'x', 'star', 'heart', 'bolt'] " :src="'/img/' + icon + '.svg'"
                        :key="icon" :alt="icon" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

#photos-background {
    background-color: #010101;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: calc(100vw + 800px);
    margin-left: -400px;
    height: calc(100vh + 1000px);
    margin-top: -500px;
    transform: rotate(25deg);

    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    overflow: hidden;
}

.phone {
    width: 258px;
    height: 466px;
    border-right: 12px solid #2a2a2a;
    background-color: #2a2a2a;
    box-sizing: border-box;
    border-radius: 24px;
    margin: 8px 14px;
    break-inside: avoid;
}

.screen {
    width: 100%;
    height: 100%;
    border: 5px solid #686868;
    box-sizing: border-box;
    border-radius: 24px;
    background-color: #fff;
    /* shadow inset */
    box-shadow: inset 0 0 4px 4px rgba(0, 0, 0, 0.1);
}

.encoche {
    width: 132px;
    height: 18px;
    background-color: #686868;
    border-radius: 0 0 12px 12px;
    margin: 0 auto;
}

.logo {
    width: 22px;
    height: 22px;
    margin: 0 auto;
    display: block;
    margin-top: 3px;
    margin-bottom: 7px;
}

.photo {
    width: 226px;
    height: 350px;
    margin: 0 auto;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
}

.description {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 12px;
    box-sizing: border-box;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
}

.name {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    display: flex;
    align-items: center;
    font-family: 'Outfit', sans-serif;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.age {
    font-size: 17px;
    font-weight: normal;
    color: #fff;
    margin-top: 2px;
}

.verified {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    margin-top: 2px;
}

.info {
    width: 16px;
    height: 16px;
}

.buttons {
    width: 190px;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
}

.buttons img {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    padding: 7px;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.08);
    box-sizing: content-box;
}

.buttons img:nth-child(odd) {
    padding: 5px;
}
</style>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

/**
                 * @type {
                 * name: string,
                 * age: number,
                 * photo: string
                 * id: string
                 * }[]
                 */
const membres = [
    {
        name: 'Amandine',
        age: 22,
        photo: './img/membres/amandine.jpg',
        id: 'amandine'
    },
    {
        name: 'Arthur',
        age: 20,
        photo: './img/membres/arthur.jpg',
        id: 'arthur'
    },
    {
        name: 'Élise',
        age: 21,
        photo: './img/membres/elise.jpg',
        id: 'elise'
    },
    {
        name: 'Tom',
        age: 22,
        photo: './img/membres/tom.jpg',
        id: 'tom'
    },
    {
        name: 'Julie',
        age: 21,
        photo: './img/membres/julie.jpg',
        id: 'julie'
    },
    {
        name: 'Romain',
        age: 21,
        photo: './img/membres/romain.jpg',
        id: 'romain'
    },
    {
        name: 'Angel',
        age: 21,
        photo: './img/membres/angel.jpg',
        id: 'angel'
    },
    {
        name: 'Nathan',
        age: 20,
        photo: './img/membres/nathan.jpg',
        id: 'nathan'
    },
    {
        name: 'Mathias',
        age: 20,
        photo: './img/membres/mathias.jpg',
        id: 'mathias'
    },
    {
        name: 'Alexandre',
        age: 22,
        photo: './img/membres/alexandre.jpg',
        id: 'alexandre'
    },
    {
        name: 'Florian',
        age: 23,
        photo: './img/membres/florian.jpg',
        id: 'florian'
    },
    {
        name: 'Léo',
        age: 20,
        photo: './img/membres/leo.jpg',
        id: 'leo'
    },
    {
        name: 'Mathieu',
        age: 21,
        photo: './img/membres/mathieu.jpg',
        id: 'mathieu1'
    },
    {
        name: 'Mathieu',
        age: 21,
        photo: './img/membres/mathieu2.jpg',
        id: 'mathieu2'
    },
    {
        name: 'Mathieu',
        age: 21,
        photo: './img/membres/mathieu3.jpg',
        id: 'mathieu3'
    },
    {
        name: 'Alycia',
        age: 22,
        photo: './img/membres/alycia.jpg',
        id: 'alycia'
    },
    {
        name: 'Luigi',
        age: 23,
        photo: './img/membres/luigi.jpg',
        id: 'luigi'
    },
    {
        name: 'Rakel',
        age: 23,
        photo: './img/membres/rakel.jpg',
        id: 'rakel'
    },
    {
        name: 'Yace',
        age: 3,
        photo: './img/membres/yace.jpg',
        id: 'yace'
    }
]

const randomMembers = ref(membres.concat(membres.map(m => ({ ...m, id: m.id + '2' }))).concat(membres.map(m => ({ ...m, id: m.id + '3' }))))
const interval = ref<NodeJS.Timer | null>(null)

onMounted(() => {
    interval.value = setInterval(() => {
        const random = membres.sort(() => Math.random() - 0.5)
        randomMembers.value = random.concat(random.map(m => ({ ...m, id: m.id + '2' }))).concat(random.map(m => ({ ...m, id: m.id + '3' })))
    }, 5000)
})

onBeforeUnmount(() => {
    if (interval.value) {
        clearInterval(interval.value)
    }
})
</script>