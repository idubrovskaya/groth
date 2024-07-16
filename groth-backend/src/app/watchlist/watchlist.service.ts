import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WatchList } from './models/watchlist.model';
import { CreateAssetResponse } from './response';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(WatchList) private readonly watchlist_repo: typeof WatchList,
  ) {}
  async createAsset(user, dto): Promise<CreateAssetResponse> {
    try {
      const watchList = {
        user: user.id,
        name: dto.name,
        assetId: dto.assetId,
      };
      await this.watchlist_repo.create(watchList);
      return watchList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserAssets(userId: number): Promise<WatchList[]> {
    try {
      return this.watchlist_repo.findAll({ where: { user: userId } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAsset(userId: number, assetId: string): Promise<boolean> {
    try {
      await this.watchlist_repo.destroy({
        where: { id: assetId, user: userId },
      });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
