import { MatchResults, OrderMatchingAlgo } from "../../interface/OrderInterfaces";

export class FIFOMatching implements OrderMatchingAlgo {
    match(): MatchResults {
        throw new Error("Method not implemented.");
    }
}