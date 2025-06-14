import style from "./TeamCard.module.css"

export const TeamCard = ({id, leaderId, departament, description}) => {

    return(
        <div className={style.card}>
            <div className={style.card_box}>
                Teste
            </div>
            <div className={style.edit_button}>
                +
            </div>
        </div>
    )
}