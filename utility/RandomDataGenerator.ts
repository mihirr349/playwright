export class RandomDataGenerator {

    private static firstNames = [
        "John", "Jane", "Alice", "Bob", "Charlie",
        "Diana", "Eve", "Frank", "Grace", "Henry"
    ];

    private static lastNames = [
        "Smith", "Johnson", "Williams", "Brown", "Jones",
        "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"
    ];

    private static readonly ALPHABETICAL =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    private static readonly ALPHANUMERIC =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    private static readonly UPPERCASE =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    private static readonly LOWERCASE =
        "abcdefghijklmnopqrstuvwxyz";

    private static readonly NUMERIC =
        "0123456789";

    private static readonly SPECIAL =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_-+=";

    private static randomString(length: number, chars: string): string {
        let result = "";

        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    private static uuid(length: number): string {
        return crypto.randomUUID().replace(/-/g, "").substring(0, length);
    }

    static generateRandomFirstName(length: number = 3): string {
        const name = this.firstNames[Math.floor(Math.random() * this.firstNames.length)];

        return `${name}${this.uuid(length)}`;
    }

    static generateRandomLastName(length: number = 3): string {
        const name = this.lastNames[Math.floor(Math.random() * this.lastNames.length)];

        return `${name}${this.uuid(length)}`;
    }

    static generateRandomEmail(length: number = 8): string {
        return `test${this.uuid(length)}@yopmail.com`;
    }

    static generateRandomPhoneNumber(length: number = 10): string {
        let phone = "9";

        for (let i = 1; i < length; i++) {
            phone += Math.floor(Math.random() * 10);
        }
        return phone;
    }

    static generateRandomPassword(length: number = 8): string {
        return this.randomString(length, this.SPECIAL);
    }

    static generateRandomAlphabetical(length: number = 5): string {
        return this.randomString(length, this.ALPHABETICAL);
    }

    static generateRandomAlphanumeric(length: number = 5): string {
        return this.randomString(length, this.ALPHANUMERIC);
    }

    static generateRandomCapitalLetters(length: number = 5): string {
        return this.randomString(length, this.UPPERCASE);
    }

    static generateRandomSmallLetters(length: number = 5): string {
        return this.randomString(length, this.LOWERCASE);
    }

    static generateRandomNumeric(length: number = 5): string {
        return this.randomString(length, this.NUMERIC);
    }

    static generateRandomAlphanumericWithSpecial(length: number = 9): string {
        return this.randomString(length, this.SPECIAL);
    }

}