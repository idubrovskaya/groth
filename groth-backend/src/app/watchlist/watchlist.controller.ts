import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchListDto } from './dto/watchlist.dto';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { CreateAssetResponse, GetUsersAssetsResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WatchList } from './models/watchlist.model';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchListService: WatchlistService) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, type: CreateAssetResponse })
  @UseGuards(JwtPermissionsGuard)
  @Post('create')
  createAsset(
    @Body() assetDto: WatchListDto,
    @Req() request,
  ): Promise<CreateAssetResponse> {
    const user = request.user;
    return this.watchListService.createAsset(user, assetDto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: GetUsersAssetsResponse })
  @UseGuards(JwtPermissionsGuard)
  @Get('get-elements')
  getUserAssets(@Req() request): Promise<WatchList[]> {
    const user = request.user;
    return this.watchListService.getUserAssets(user.id);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200 })
  @UseGuards(JwtPermissionsGuard)
  @Delete()
  deleteAsset(@Query('id') assetId: string, @Req() request): Promise<boolean> {
    const { id } = request.user;
    return this.watchListService.deleteAsset(id, assetId);
  }
}
