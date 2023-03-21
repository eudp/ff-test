import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GithubService {
  async getCommits() {
    const url = 'https://api.github.com/repos/eudp/ff-test/commits';
    const headers = {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    };
    const response = await axios.get(url, { headers });

    const commits = response.data.map((commit) => {
      return {
        sha: commit.sha,
        message: commit.commit.message,
        author: commit.commit.author.name,
        date: commit.commit.author.date,
      };
    });

    return { data: commits };
  }
}
