import TicketManager from "../services/ticket.service.js"


const ticketManager = new TicketManager()

export async function generateATicket(req, res) {
    const {userId} = req.body
    const {cid} = req.params
    try {
        if(!userId) {
            res.json({message:'Necesita pasar por body un userId'})
        } else {
            const ticket = await ticketManager.generateTicket(userId, cid)
            res.json({message:'Ticket generado con exito', ticket})
        }
    } catch (error) {
        console.log(error)
    }
}         