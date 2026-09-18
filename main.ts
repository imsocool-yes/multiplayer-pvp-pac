// % color="#8E44AD" icon="\uf11b" block="Arcade PvP Pack"
namespace arcadePvpPack {

    // Internal arrays to manage trackers for all 4 players natively
    let canShootFlags = [true, true, true, true]
    let playerKills = [0, 0, 0, 0]

    /**
     * Checks if a player is allowed to shoot based on an active weapon cooldown rate.
     * @param playerNumber The integer ID of the player checking restrictions (1-4)
     * @param delayTimeMillis How long the weapon is locked after firing in milliseconds (e.g., 500)
     */
    // % block="player %playerNumber can fire weapon? (cooldown %delayTimeMillis ms)"
    // % playerNumber.min=1 playerNumber.max=4 playerNumber.defl=1
    // % delayTimeMillis.defl=500
    export function checkWeaponCooldown(playerNumber: number, delayTimeMillis: number): boolean {
        let index = playerNumber - 1
        if (index < 0 || index > 3) return false

        if (canShootFlags[index]) {
            // Lock the weapon immediately
            canShootFlags[index] = false

            // Start a timer loop to unlock the weapon after the delay passes
            setTimeout(function () {
                canShootFlags[index] = true
            }, delayTimeMillis)

            return true
        }
        return false
    }

    /**
     * Adds a knockout credit point to a player's score counter.
     * @param playerNumber The integer ID of the player scoring the knockout (1-4)
     */
    // % block="add knockout to player %playerNumber"
    // % playerNumber.min=1 playerNumber.max=4 playerNumber.defl=1
    export function registerKnockout(playerNumber: number): void {
        let index = playerNumber - 1
        if (index < 0 || index > 3) return

        playerKills[index] += 1

        // Play an announcement animation noise
        music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    }

    /**
     * Fetches the current live knockout score for a specific player.
     * @param playerNumber The integer ID of the player (1-4)
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

        // Loop every 2 seconds to close the battle arena feel inward
        game.onUpdateInterval(2000, function () {
            scene.cameraShake(4, 200)
        })
    }
}

