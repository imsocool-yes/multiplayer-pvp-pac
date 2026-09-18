// % color="#8E44AD" icon="\uf11b" block="Arcade PvP Pack"
namespace arcadePvpPack {

    // Setup clear storage arrays for all 4 players
    let canShootFlags = [true, true, true, true]
    let playerKills = [0, 0, 0, 0]

    /**
     * Checks if a player can shoot based on an active weapon cooldown rate.
     */
    // % block="player %playerNumber can fire weapon? (cooldown %delayTimeMillis ms)"
    // % playerNumber.min=1 playerNumber.max=4 playerNumber.defl=1
    // % delayTimeMillis.defl=500
    export function checkWeaponCooldown(playerNumber: number, delayTimeMillis: number): boolean {
        let index = playerNumber - 1
        if (index < 0 || index > 3) return false

        if (canShootFlags[index]) {
            canShootFlags[index] = false
            setTimeout(function () {
                canShootFlags[index] = true
            }, delayTimeMillis)
            return true
        }
        return false
    }

    /**
     * Adds a knockout credit point to a player's score counter.
     */
    // % block="add knockout to player %playerNumber"
    // % playerNumber.min=1 playerNumber.max=4 playerNumber.defl=1
    export function registerKnockout(playerNumber: number): void {
        let index = playerNumber - 1
        if (index < 0 || index > 3) return
        playerKills[index] += 1
        music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    }

    /**
     * Fetches the current live knockout score for a specific player.
     */
    // % block="player %playerNumber knockouts"
    // % playerNumber.min=1 playerNumber.max=4 playerNumber.defl=1
    export function getPlayerScore(playerNumber: number): number {
        let index = playerNumber - 1
        if (index < 0 || index > 3) return 0
        return playerKills[index]
    }

    /**
     * Activates a Sudden Death hazard environment that shakes the screen periodically.
     */
    // % block="trigger sudden death grid collapse"
    export function activateSuddenDeath(): void {
        effects.blizzard.startScreenEffect()
        music.play(music.melodyPlayable(music.siren), music.PlaybackMode.InBackground)
        game.onUpdateInterval(2000, function () {
            scene.cameraShake(4, 200)
        })
    }
}
