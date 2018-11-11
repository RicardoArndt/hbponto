import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {
    private localStorage = window.localStorage;
    
    setItem(key: string, value: string): void {
        this.localStorage.setItem(key, value);
    }

    getItem(key: string): string {
        return this.localStorage.getItem(key);
    }

    setAuthenticationTokens(token: string, jiraToken: string, userId: string) {
        this.localStorage.setItem("Token", token);
        this.localStorage.setItem("AuthJiraToken", jiraToken);
        this.localStorage.setItem("UserId", userId);
    }

    clearAllCache() {
        this.localStorage.clear();
    }

    clearCacheAndReCacheBoard(boardId) {
        this.localStorage.removeItem('boardSelected');
        this.localStorage.setItem('boardSelected', boardId);
    }

    clearCacheAndReCacheSprint(sprintId) {
        this.localStorage.removeItem('sprintSelected');
        this.localStorage.setItem('sprintSelected', sprintId);
    }

    get TokenAuthentication() {
        return this.localStorage.getItem("Token");
    }

    get TokenJiraAuthentication() {
        return this.localStorage.getItem("AuthJiraToken");
    }

    get UserId() {
        return this.localStorage.getItem("UserId");
    }
}