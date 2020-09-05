import LRU from 'lru-cache'

const REPO_CACHE = new LRU({
  maxAge: 1000 * 60 * 60
})

export const cache = (repo) => {
  const full_name = repo.full_name
  REPO_CACHE.set(full_name, repo)
}

export const get = (full_name) => {
  return REPO_CACHE.get(full_name)
}

export const cacheArray = (repos) => {
  repos.forEach(repo => cache(repo))
}