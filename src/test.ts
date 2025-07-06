import {getCoordinatesFromPage} from "@/utils/scrapping.ts";

async function test() {
    const result = await getCoordinatesFromPage("https://timemark.com/s/LPAWY4EK4CXA43/8")
    console.log(result)
}

test()