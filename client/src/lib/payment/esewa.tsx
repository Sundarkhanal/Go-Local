export const redirectToEsewa = (paymentUrl:string, payload:any) => {
    const form = document.createElement("form");
    form.method = "POST",
    form.action = paymentUrl

    Object.keys(payload).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden",
        input.name = key,
        input.value = payload[key],
        form.appendChild(input) //adds each input inside form
    });
    document.body.appendChild(form)
    form.submit()
}