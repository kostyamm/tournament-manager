
const participants = ['Alice', 'Bob', 'Charlie', 'David', 'Kostya'];

export const generateRoundRobin = (participants: Array<string>): Array<Array<Array<string>>> => {
    const numPlayers = participants.length;

    // Если количество участников нечетное, добавляем фиктивного игрока "bye"
    if (numPlayers % 2 !== 0) {
        participants.push("bye");
    }

    const schedule: string[][][] = []; // Массив для хранения всех раундов
    const rounds = participants.length - 1; // Количество раундов
    const halfSize = participants.length / 2; // Половина списка участников

    const players = [...participants]; // Копия массива участников

    // Основной цикл для создания расписания по раундам
    for (let round = 0; round < rounds; round++) {
        const roundMatches: string[][] = []; // Массив для хранения пар текущего раунда

        // Генерация пар для текущего раунда
        for (let i = 0; i < halfSize; i++) {
            const player1 = players[i];
            const player2 = players[players.length - 1 - i];

            // Пропускаем матч, если один из игроков - "bye"
            if (player1 !== "bye" && player2 !== "bye") {
                roundMatches.push([player1, player2]);
            }
        }

        schedule.push(roundMatches); // Добавляем текущий раунд в расписание

        // Вращаем массив участников (кроме первого)
        const lastPlayer = players.pop(); // Получаем последнего игрока
        if (lastPlayer !== undefined) { // Проверяем, что это не undefined
            players.splice(1, 0, lastPlayer); // Перемещаем последнего игрока на вторую позицию
        }
    }

    return schedule;
}